import React, { useEffect, useState, useRef } from 'react';
import { properties } from "../../properties";
import { post } from "../../common/util/restUtil";
import { Modal } from 'react-bootstrap';
import DynamicTable from "../../common/table/DynamicTable";
import { ProjectWiseColumns } from "./Columns";
import moment from 'moment'

const ProjectWise = (props) => {
    const { searchParams, isParentRefresh,modalStyle } = props?.data;
    console.log('isParentRefresh-------->', isParentRefresh)
    const [projectWiseData, setProjectWiseData] = useState([]);
    const [filteredProjectsData, setFilteredProjectsData] = useState([]);
    const [projectCounts, setProjectCounts] = useState([]);
    const [isRefresh, setIsRefresh] = useState(false);
    const [show, setShow] = useState(false);
    const tableRef = useRef(true);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        post(properties.HELPDESK_API + '/project-wise', searchParams)
            .then((response) => {
                setProjectWiseData(response?.data?.rows);
                const projectCounts = {};
                response?.data?.rows?.forEach(item => {
                    const description = item?.projectDesc?.description;
                    if (projectCounts[description]) {
                        projectCounts[description]++;
                    } else {
                        projectCounts[description] = 1;
                    }
                });
                setProjectCounts(projectCounts)
            })
            .catch(error => {
                console.error(error);
            });
    }, [isRefresh, searchParams, isParentRefresh]);


    const showDetails = (projectName) => {
        const filteredProjectData = projectWiseData?.filter((item) => item?.projectDesc?.description === projectName);
        console.log('filteredProjectData------>', filteredProjectData)
        setFilteredProjectsData(filteredProjectData)
        setShow(true)
    }

    const handleClose = () => {
        setShow(false);
        setFilteredProjectsData([]);
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
            <div className="cmmn-skeleton mh-430">
                <div className="card-body">
                    <div className="skel-dashboard-title-base">
                        <span className="skel-header-title"> Project wise Open Helpdesk </span>
                        <div className="skel-dashboards-icons">
                            <span>
                                <i className="material-icons" onClick={() => setIsRefresh(!isRefresh)}>refresh</i>
                            </span>
                            {/* <span>
                                <i className="material-icons"> filter_alt </i>
                            </span> */}
                        </div>
                    </div>
                    <hr className="cmmn-hline" />
                    <div id="cardCollpase5cn" className='mt-4'>
                        <table className="table table-hover mb-0 table-centered table-nowrap">
                            <tbody>
                                {Object.entries(projectCounts).map(([description, count]) => (<tr>
                                    <td>
                                        <h5 className="font-size-14 mb-0"> {description} </h5>
                                    </td>
                                    <td>
                                        <p className="text-dark mb-0 cursor-pointer" onClick={(e) => showDetails(description)}> {count} </p>
                                    </td>
                                </tr>))}
                            </tbody>
                        </table>
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
                        row={filteredProjectsData}
                        rowCount={filteredProjectsData?.length}
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
        </div>
    )
}

export default ProjectWise;