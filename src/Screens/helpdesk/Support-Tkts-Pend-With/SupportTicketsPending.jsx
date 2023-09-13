import React, { useEffect, useState, useRef } from 'react';
import { properties } from "../../../properties";
import { post } from "../../../common/util/restUtil";
import { Modal } from 'react-bootstrap';
import DynamicTable from "../../../common/table/DynamicTable";
import { ProjectWiseColumns } from "../Columns";
import { RegularModalCustomStyles } from "../../../common/util/util";

import moment from 'moment'
import Chart from './Chart';

const SupportTicketsPending = (props) => {
    const { searchParams, isParentRefresh,modalStyle } = props?.data;
    const [agentWiseData, setProjectWiseData] = useState([]);
    const [pendingTktsCounts, setPendingTktsCounts] = useState([]);
    const [filteredPendingTktsData, setFilteredPendingTktsData] = useState([]);
    const [isRefresh, setIsRefresh] = useState(false);
    const [show, setShow] = useState(false);
    const tableRef = useRef(true);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        post(properties.HELPDESK_API + '/support-tkt-pending', searchParams)
            .then((response) => {
                setProjectWiseData(response?.data?.rows);
                const pendingTktsCounts = {};
                response?.data?.rows?.forEach(item => {
                    const description = item?.project;
                    if (pendingTktsCounts[description]) {
                        pendingTktsCounts[description]++;
                    } else {
                        pendingTktsCounts[description] = 1;
                    }
                });
                setPendingTktsCounts(pendingTktsCounts)
            })
            .catch(error => {
                console.error(error);
            });
    }, [isRefresh, searchParams, isParentRefresh])

    const showDetails = (projectName) => {
        const filteredPendingTktsData = agentWiseData?.filter((item) => item?.project === projectName);
        console.log('filteredPendingTktsData------>', filteredPendingTktsData)
        setFilteredPendingTktsData(filteredPendingTktsData)
        setShow(true)
    }

    const handleClose = () => {
        setShow(false);
        setFilteredPendingTktsData([]);
    };


    const handleCellRender = (cell, row) => {
        if (cell.column.id === "createdAt") {
            return (<span>
                {moment(cell.value).format('YYYY-MM-DD')}
            </span>)
        }
        if (cell.column.id === "assignedAgentDetails") {
            return (<span>
                {cell?.value?.assignedAgentDetails?.firstName + ' ' + cell?.value?.assignedAgentDetails?.lastName}
            </span>)
        }
        else {
            return (<span>{cell.value}</span>)
        }
    }

    const handlePageSelect = (pageNo) => {
        setCurrentPage(pageNo)
    }

    return (
        <div className="col-md-4">
            <div className="cmmn-skeleton">
                <div className="card-body">
                    <div className="skel-dashboard-title-base">
                        <span className="skel-header-title"> Support Ticket Pending with </span>
                        <div className="skel-dashboards-icons">
                            <span>
                                <i className="material-icons" onClick={() => setIsRefresh(!isRefresh)}>refresh</i>
                            </span>
                            {/* <span>
                                <i className="material-icons" > filter_alt </i>
                            </span> */}
                        </div>
                    </div>
                    <hr className="cmmn-hline" />
                </div>
                <div className="card-body py-0">
                    <div className="row">
                        {Object.entries(pendingTktsCounts).map(([description, count]) => (<div className="col-3">
                            <div className="text-center">
                                <p className="mb-2 text-truncate">{description}</p>
                                <h4 className="text-primary cursor-pointer" onClick={() => showDetails(description)}> {count} </h4>
                            </div>
                        </div>))}
                        <div className="col-12 text-center">
                            <div className="skel-graph-sect mt-4">
                                <Chart data={{ chartData: pendingTktsCounts }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={show} backdrop="static" keyboard={false} onHide={handleClose} style={modalStyle}>
                <Modal.Header>
                    <b>Project Wise Open Helpdesk Details</b>
                    <button type="button" className="close mr-2" keyboard={false} onClick={handleClose}>
                        <span aria-hidden="true">×</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <DynamicTable
                        listKey={"Assigned"}
                        row={filteredPendingTktsData}
                        rowCount={filteredPendingTktsData?.length}
                        header={ProjectWiseColumns}
                        fixedHeader={true}
                        itemsPerPage={perPage}
                        isScroll={true}
                        isTableFirstRender={tableRef}
                        backendCurrentPage={currentPage}
                        handler={{
                            handleCellRender: handleCellRender,
                            handlePageSelect: handlePageSelect,
                            handleItemPerPage: setPerPage,
                            handleCurrentPage: setCurrentPage,
                            handleFilters: setFilters
                        }}
                    />
                </Modal.Body>
            </Modal>
        </div >

    )
}

export default SupportTicketsPending;