import React,{useState,useEffect} from 'react'
import { Modal, Select , Form,Input ,Table,DatePicker } from 'antd'
import Layout from '../Components/Layout/Layout'
import { UnorderedListOutlined, AreaChartOutlined ,  EditFilled, DeleteFilled} from "@ant-design/icons";
import axios, { all } from 'axios'
import Spinner from '../Components/Spinner'
import { message } from 'antd'
import moment from "moment";
import Analytics from '../Components/Analytics';
import { FileTextOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';



const { RangePicker } = DatePicker;



const HomePage = () => {

  const [showModal, setshowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setallTransaction] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);




  //table data
  // const columns = [
  //   {
  //     title: "Date",
  //     dataIndex: "date",
  //     render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
  //   },
  //   {
  //     title: "Amount",
  //     dataIndex: "amount",
  //   },
  //   {
  //     title: "Type",
  //     dataIndex: "type",
  //   },
  //   {
  //     title: "Category",
  //     dataIndex: "category",
  //   },
  //   {
  //     title: "Refrence",
  //     dataIndex: "refrence",
  //   },
  //   {
  //     title: "Actions",
  //     render: (text, record) => (
  //       <div>
  //         <EditOutlined
  //           onClick={() => {
  //             setEditable(record);
  //             setshowModal(true);
  //           }}
  //         />
  //         <DeleteOutlined
  //           className="mx-2"
  //           onClick={() => {
  //             handleDelete(record);
  //           }}
  //         />
  //       </div>
  //     ),
  //   },
  // ];

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Refrence",
      dataIndex: "refrence",
    },
    {
      title: "Edit",
      render: (text, record) => (
        <div>
          <EditFilled
            onClick={() => {
              setEditable(record);
              setshowModal(true);
            }}
          />
        </div>
      ),
    },
    {
      title: "Delete",
      render: (text, record) => (
        <div>
        <DeleteFilled
          className="mx-2"
          color='red'
          onClick={() => {
          handleDelete(record);
          }}
          />
        </div>
      ),
    },

  ];



    //delete handler
    const handleDelete = async (record) => {
      try {
        setLoading(true);
        await axios.post("/transections/delete-transection", {
          transacationId: record._id,
        });
        setLoading(false);
        message.success("Transaction Deleted!");
      } catch (error) {
        setLoading(false);
        console.log(error);
        message.error("unable to delete");
      }
    };


  // get all Transaction

   


    useEffect(() => {

          const getalltransaction = async () =>{
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                setLoading(true);
                const res = await axios.post('/transections/get-transection',
                {
                  userid:user._id,
                  frequency,
                  selectedDate,
                  type
                
                });
                setLoading(false);
                setallTransaction(res.data)
                console.log(res.data)

            } catch (error) {
                console.log(error);
                message.error('Ftech issue with transaction')
            }
        }

          getalltransaction();
        
    },[frequency,selectedDate,type]);





 // form handling
 const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        await axios.post("/transections/edit-transection", {
          payload: {
            ...values,
            userId: user._id,
          },
          transacationId: editable._id,
        });
        setLoading(false);
        message.success("Transaction Updated Successfully");
      } else {
        await axios.post("/transections/add-transection", {
          ...values,
          userid: user._id,
        });
        setLoading(false);
        message.success("Transaction Added Successfully");
      }
      setshowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("Faild to add transection");
    }
  };



  return (
    <Layout>
    {loading && <Spinner />}
    <br />
    <br />
        <div className="filters">
        {/*================================================================================*/}
          <div>  
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 year</Select.Option>
            <Select.Option value="custom">Custom Year </Select.Option>
          </Select>
            {frequency === "custom" && (
              <RangePicker
                value={selectedDate}
                onChange={(values) => setSelectedate(values)}
              />
            )}
          </div>

        {/*================================================================================*/}

          <div>
              <h6>Select Type</h6>
              <Select value={type} onChange={(values) => setType(values)}>
                <Select.Option value="all">All Types</Select.Option>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
              {frequency === "custom" && (
                <RangePicker
                  value={selectedDate}
                  onChange={(values) => setSelectedate(values)}
                />
              )}
        </div>

        {/*================================================================================*/}

          <div className="switch-icons">

            <UnorderedListOutlined
              className={`mx-2 ${
                viewData === "table" ? "active-icon" : "inactive-icon"
              }`}
              onClick={() => setViewData("table")}
            /> 
            </div>
            <div className="switch-icons">
            <AreaChartOutlined 
              className={`mx-2 ${
                viewData === "analytics" ? "active-icon" : "inactive-icon"
              }`}
              onClick={() => setViewData("analytics")}
            />

         </div>

        {/*================================================================================*/}

          <div>
            <button className='btn btn-primary p-6' onClick={()=>setshowModal(true)}>Add new + </button>
          </div>
        </div>
        <br />
        
        {/*================================================================================*/}

        <div className="content">
          {viewData === "table" ? (
            <div className='mytable'>
               <Table columns={columns} dataSource={allTransaction} />
            </div>
           
          ) : (
            <Analytics allTransection={allTransaction} />
          )}
        </div>
        
        {/*================================================================================*/}


        <Modal  title={editable ? "Edit Transaction" : "Add Transection"} open={showModal} onCancel={()=>setshowModal(false)} footer={false}>
        
        
            <Form initialValues={editable} layout="vertical" onFinish={handleSubmit}>

                <Form.Item label="Amount" name="amount">
                  <Input  type='text'/>
                </Form.Item>

                <Form.Item label="Type" name="type">
                  <Select>
                    <Select.Option value='income'>Income</Select.Option>
                    <Select.Option value='expense'>Expense</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Category" name="category">
                  <Select>
                    <Select.Option value='salary'>Income</Select.Option>
                    <Select.Option value='tip'>Tip</Select.Option>
                    <Select.Option value='project'>Project</Select.Option>
                    <Select.Option value='food'>Food</Select.Option>
                    <Select.Option value='movie'>Movie</Select.Option>
                    <Select.Option value='bills'>Bills</Select.Option>
                    <Select.Option value='medical'>Medical</Select.Option>
                    <Select.Option value='fees'>Fees</Select.Option>
                    <Select.Option value='tax'>Tax</Select.Option>
                  </Select>
                </Form.Item>
                
                
                <Form.Item label="Date" name="date">
                  <Input  type='date'/>
                </Form.Item>

                <Form.Item label="Refrence" name="refrence">
                  <Input  type='text'/>
                </Form.Item>

                <Form.Item label="Description" name="description">
                  <Input  type='text'/>
                </Form.Item>

                <div className="d-flex justify-content-end">
                    <button type='submit' className='btn btn-primary'>Save</button>
                </div>
                </Form>


        </Modal>

    </Layout>
  )
}

export default HomePage