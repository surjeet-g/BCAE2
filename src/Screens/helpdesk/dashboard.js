import moment from "moment";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { unstable_batchedUpdates } from 'react-dom';
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import { DateRangePicker } from 'rsuite';
import { AppContext } from "../../AppContext";
import insightViewPng from '../../assets/images/dashboard-icons.png';
import filterPng from '../../assets/images/filter-btn.png';
import liveStreamPng from '../../assets/images/livestream.png';
import { get } from "../../common/util/restUtil";
import { properties } from "../../properties";
import AgentWise from './AgentWise';
import Ageing from './Helpdesk-By-Ageing/Ageing';
import Severity from './Helpdesk-By-Severity/Severity';
import ByStatus from './Helpdesk-By-Status/ByStatus';
import HelpdeskSummary from './Helpdesk-By-Summary/HelpdeskSummary';
import HourlyTickets from './Helpdesk-Hourly/HourlyTicktes';
import Trend from './Helpdesk-Trends/Trend';
import ByProject from './Live-Streaming/ByProjects';
import BySeverity from './Live-Streaming/BySeverity';
import ByStatusLive from './Live-Streaming/ByStatusLive';
import ByType from './Live-Streaming/ByType';
import ProjectWise from './ProjectWise';
import SupportTicketsPending from './Support-Tkts-Pend-With/SupportTicketsPending';

const HelpdeskDashboard = (props) => {
    let { auth, setAuth } = useContext(AppContext);
    const formRef = useRef();
    const { handleSubmit, control, reset } = useForm();
    const [filterIsOpen, setFilterIsOpen] = useState(false);
    const [isRightModalOpen, setIsRightModalOpen] = useState(false);
    const [searchParams, setSearchParams] = useState({});
    const [submitError, setSubmitError] = useState(null);
    const [projects, setProjects] = useState([]);
    const [helpdeskStatus, setHelpdeskStatus] = useState([]);
    const [helpdeskPriorities, setHelpdeskPriorities] = useState([]);
    const [helpdeskSeverities, setHelpdeskSeverities] = useState([]);
    const [masterLookupData, setMasterLookupData] = useState({});
    const [isChecked, setIsChecked] = useState(false);
    const [isParentRefresh, setIsParentRefresh] = useState(false);
    const [pageRefreshTime, setPageRefreshTime] = useState(1);
    const [stream, setStream] = useState('insightView');// liveStreamView
    const modalStyle = {
        'width': '94%',
        'top': '19%',
        'left': '3%',
        'paddingLeft': '2px'
    }
    useEffect(() => {
        get(properties.MASTER_API + '/lookup?searchParam=code_type&valueParam=PROJECT,HELPDESK_STATUS,PRIORITY,SEVERITY')
            .then((response) => {
                const { data } = response;
                setMasterLookupData({ ...data });
                setProjects(data?.PROJECT?.map((ele) => {
                    return {
                        label: ele?.description,
                        value: ele?.code
                    }
                }));
                setHelpdeskStatus(data?.HELPDESK_STATUS?.map((ele) => {
                    return {
                        label: ele?.description,
                        value: ele?.code
                    }
                }));
                setHelpdeskPriorities(data?.PRIORITY?.map((ele) => {
                    return {
                        label: ele?.description,
                        value: ele?.code
                    }
                }));
                setHelpdeskSeverities(data?.SEVERITY?.map((ele) => {
                    return {
                        label: ele?.description,
                        value: ele?.code
                    }
                }));
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        unstable_batchedUpdates(() => {
            if (pageRefreshTime && typeof (pageRefreshTime) === 'number') {
                const intervalId = setInterval(() => {
                    if (isChecked) {

                        // const currentTime = moment().format('DD-MM-YYYY HH:mm:ss')
                        setIsParentRefresh(!isParentRefresh)
                    }
                }, Number(pageRefreshTime) * 60 * 1000);
                console.log("Component refreshed!-------->", pageRefreshTime);
                // return () => clearInterval(intervalId);
            }
        })
    }, [isChecked]);

    const onSubmit = (data) => {
        console.log('data--------->', data);
        setSubmitError(null);
        const noFilterSelected = !data?.dateRange?.length && !data.project && !data.status && !data.severity;
        if (noFilterSelected) {
            setSubmitError("Please apply atleast one filter"); return;
        }

        if (data?.dateRange?.length) {
            data.dateRange[1] = data.dateRange?.[1] ? data.dateRange?.[1] : data.dateRange?.[0]
            data['fromDate'] = moment(data.dateRange?.[0]).format("YYYY-MM-DD");
            data['toDate'] = moment(data.dateRange?.[1]).format("YYYY-MM-DD")
        }

        setSearchParams({
            ...data
        });
    }

    const handleClear = (event) => {
        event.preventDefault();
        reset();
        setSearchParams({
            fromDate: undefined, toDate: undefined, status: undefined, priority: undefined, project: undefined, severity: undefined
        });
    }

    const handleAutoRefresh = (event) => {
        console.log('here live streming')
        if (!pageRefreshTime) {
            toast.error("Refresh Time Is Require!");
            return
        }
        setIsChecked(!isChecked);
        // setIsChecked(event.target.checked);
    }

    const handleSetRefreshTime = (e) => {
        unstable_batchedUpdates(() => {
            setIsChecked(false)
            setPageRefreshTime(parseInt(e.target.value));
        })
    }

    const handleOpenRightModal = (payload) => {
        console.log('payload----->', payload);
        console.log('auth----->', auth?.user?.userId);
        props.history.push(`${process.env.REACT_APP_BASE}/helpdesk`, {
            data: {
                payload,
                source: 'QUEUE',
                from: 'DASHBOARD',
                tktWithLoggedIn: Number(auth?.user?.userId) === Number(payload?.oUserId)
            }
        })
    }

    const switchStreaming = (streamType) => {
        setStream(streamType)
    }

    return (
        <div className="content">
            <div className="container-fluid pr-1">
                <div className="cnt-wrapper">
                    <div className="card-skeleton">
                        <div className="customer-skel mt-0">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="">
                                        <div className="tab-pane fade show active" id="me" role="tabpanel" aria-labelledby="me-tab">
                                            <div className="skle-swtab-sect">
                                                <div className="db-list mb-0 pl-0">
                                                    <span className="skel-fr-sel-cust">
                                                        <div className="list-dashboard db-list-active skel-self-live">
                                                            {stream === "insightView" && <span className="db-title" onClick={() => switchStreaming('liveStreamView')}>
                                                                <img src={liveStreamPng} className="img-fluid pr-1" /> Switch to Live Stream </span>}
                                                            {stream === "liveStreamView" && <span className="db-title" onClick={() => switchStreaming('insightView')}>
                                                                <span class="db-title"><img src={insightViewPng} class="img-fluid pr-1" /> Switch to Insight View</span>
                                                            </span>}
                                                        </div>
                                                    </span>
                                                    <span className="skel-fr-sel-serv">
                                                        <div className="list-dashboard skel-informative-insights" style={{ display: "none" }}>
                                                            <span className="db-title">Helpdesk Overview</span>
                                                        </div>
                                                    </span>
                                                </div>
                                                <form className="form-inline">
                                                    {/* <span className="ml-1">Auto Refresh</span>
                                                    <div className="switchToggle ml-1">
                                                        <input id="switch1" type="checkbox" checked={isChecked} onChange={handleAutoRefresh} />
                                                        <label htmlFor="switch1">Toggle</label>
                                                    </div>
                                                    <select className="custom-select custom-select-sm ml-1" value={pageRefreshTime} onChange={handleSetRefreshTime} >
                                                        <option value="Set">Set</option>
                                                        <option value={Number(1)}>1 Min</option>
                                                        <option value={Number(5)}>5 Min</option>
                                                        <option value={Number(15)}>15 Min</option>
                                                        <option value={Number(30)}>30 Min</option>
                                                    </select> */}
                                                    <span className="skel-fr-sel-cust" onClick={() => setFilterIsOpen(!filterIsOpen)}>
                                                        <div className="list-dashboard db-list-active skel-self cursor-pointer">
                                                            <span className="db-title"> Filter{" "} <img src={filterPng} className="img-fluid pl-1" />
                                                            </span>
                                                        </div>
                                                    </span>
                                                </form>
                                            </div>
                                            {filterIsOpen && <div className="skel-filter-int" id="searchBlock1">
                                                <Form className="mt-1 filter-form" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                                                    <div className="row mt-3 skel-filter-static">
                                                        {stream === 'insightView' && <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="apptname" className="filter-form-label control-label">Date Range</label>

                                                                <Controller
                                                                    control={control}
                                                                    name="dateRange"
                                                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                                                        <DateRangePicker
                                                                            format="dd-MM-yyyy"
                                                                            character={' to '}
                                                                            value={value ? value : []}
                                                                            onChange={onChange}
                                                                            placeholder="Select Date Range"
                                                                            className="z-idx w-100"
                                                                            placement='bottomEnd'
                                                                            preventOverflow
                                                                        />
                                                                    )}
                                                                />

                                                            </div>
                                                        </div>}

                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="idType" className="control-label"> By Projects </label>
                                                                <Controller
                                                                    control={control}
                                                                    name="project"
                                                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                                                        <ReactSelect
                                                                            inputRef={ref}

                                                                            menuPortalTarget={document.body}
                                                                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}

                                                                            className="w-100"
                                                                            options={projects}
                                                                            isMulti={true}
                                                                            value={value ? projects.find(c => c.value === value) : null}
                                                                            onChange={val => onChange(val)}
                                                                        />
                                                                    )}
                                                                />
                                                                <span className="errormsg" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="idType" className="control-label"> By Status </label>
                                                                <Controller
                                                                    control={control}
                                                                    name="status"
                                                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                                                        <ReactSelect
                                                                            inputRef={ref}

                                                                            menuPortalTarget={document.body}
                                                                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}

                                                                            className="w-100"
                                                                            options={helpdeskStatus}
                                                                            isMulti={true}
                                                                            value={value ? helpdeskStatus.find(c => c.value === value) : null}
                                                                            onChange={val => onChange(val)}
                                                                        />
                                                                    )}
                                                                />
                                                                <span className="errormsg" />
                                                            </div>
                                                        </div>
                                                        {/* <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="idType" className="control-label"> By Priority </label>
                                                                <Controller
                                                                    control={control}
                                                                    name="priority"
                                                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                                                        <ReactSelect
                                                                            inputRef={ref}

                                                                            menuPortalTarget={document.body}
                                                                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}

                                                                            className="w-100"
                                                                            options={helpdeskPriorities}
                                                                            isMulti={true}
                                                                            value={value ? helpdeskPriorities.find(c => c.value === value) : null}
                                                                            onChange={val => onChange(val)}
                                                                        />
                                                                    )}
                                                                />
                                                                <span className="errormsg" />
                                                            </div>
                                                        </div> */}
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="idType" className="control-label"> By Severity </label>
                                                                <Controller
                                                                    control={control}
                                                                    name="severity"
                                                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                                                        <ReactSelect
                                                                            inputRef={ref}

                                                                            menuPortalTarget={document.body}
                                                                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}

                                                                            className="w-100"
                                                                            options={helpdeskSeverities}
                                                                            isMulti={true}
                                                                            value={value ? helpdeskSeverities.find(c => c.value === value) : null}
                                                                            onChange={val => onChange(val)}
                                                                        />
                                                                    )}
                                                                />
                                                                <span className="errormsg" />
                                                            </div>
                                                        </div>
                                                        {/* <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="idType" className="control-label"> By User </label>
                                                                <select id="idType" className="form-control ">
                                                                    <option value="">Select</option>
                                                                    <option value="CIT_DL">Internal User</option>
                                                                    <option value="CIT_IC">External User</option>
                                                                </select>
                                                                <span className="errormsg" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="idType" className="control-label"> By Interaction Category </label>
                                                                <select id="idType" className="form-control ">
                                                                    <option value="">Select</option>
                                                                    <option value="CIT_DL">Internal User</option>
                                                                    <option value="CIT_IC">External User</option>
                                                                </select>
                                                                <span className="errormsg" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="idType" className="control-label"> By Interaction Type </label>
                                                                <select id="idType" className="form-control ">
                                                                    <option value="">Select</option>
                                                                    <option value="CIT_DL">Internal User</option>
                                                                    <option value="CIT_IC">External User</option>
                                                                </select>
                                                                <span className="errormsg" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="idType" className="control-label"> By Service Category </label>
                                                                <select id="idType" className="form-control ">
                                                                    <option value="">Select</option>
                                                                    <option value="CIT_DL">Internal User</option>
                                                                    <option value="CIT_IC">External User</option>
                                                                </select>
                                                                <span className="errormsg" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="idType" className="control-label"> By Service Type </label>
                                                                <select id="idType" className="form-control ">
                                                                    <option value="">Select</option>
                                                                    <option value="CIT_DL">0 to 3 days</option>
                                                                    <option value="CIT_IC">3 to 5 days</option>
                                                                    <option value="CIT_IC">&gt; 5 days</option>
                                                                </select>
                                                                <span className="errormsg" />
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                    <hr className="cmmn-hline" />
                                                    {submitError && <span className="errormsg">{submitError}</span>}
                                                    <div className="form-group skel-filter-frm-btn">
                                                        <button className="skel-btn-cancel" onClick={(e) => handleClear(e)}>
                                                            Clear
                                                        </button>
                                                        <button className="skel-btn-submit" onClick={() => { formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })) }}>
                                                            Filter
                                                        </button>
                                                    </div>
                                                </Form>
                                            </div>}
                                            {stream === "insightView" && <div className="skel-self-data">
                                                <div className="skel-interaction-dashboard-rht-base">
                                                    <div className="row">
                                                        <HelpdeskSummary data={{ searchParams, isParentRefresh, modalStyle }} handlers={{ handleOpenRightModal }} />
                                                        <HourlyTickets data={{ searchParams, isParentRefresh, modalStyle }} handlers={{ setIsRightModalOpen }} />
                                                        <Trend data={{ searchParams, isParentRefresh, modalStyle }} handlers={{ setIsRightModalOpen }} />
                                                    </div>
                                                    <div className="row mt-3">
                                                        <SupportTicketsPending data={{ searchParams, isParentRefresh, modalStyle }} handlers={{ setIsRightModalOpen }} />
                                                        <Ageing data={{ searchParams, isParentRefresh, modalStyle }} handlers={{ setIsRightModalOpen }} />
                                                        <Severity data={{ searchParams, isParentRefresh, modalStyle }} handlers={{ setIsRightModalOpen }} />
                                                    </div>
                                                    <div className="row mt-3">
                                                        <ProjectWise data={{ searchParams, isParentRefresh, modalStyle }} handlers={{ setIsRightModalOpen }} />
                                                        <ByStatus data={{ searchParams, isParentRefresh, modalStyle }} handlers={{ setIsRightModalOpen }} />
                                                        <AgentWise data={{ searchParams, isParentRefresh, modalStyle }} handlers={{ setIsRightModalOpen }} />
                                                    </div>
                                                </div>
                                            </div>}
                                            {stream === "liveStreamView" && <div className="skel-informative-data">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <ByProject data={{ searchParams }} />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <ByStatusLive data={{ searchParams }} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <ByType data={{ searchParams }} />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <BySeverity data={{ searchParams }} />
                                                    </div>
                                                </div>
                                            </div>}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HelpdeskDashboard;