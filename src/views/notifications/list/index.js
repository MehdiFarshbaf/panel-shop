// ** React Imports
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

// ** Table Columns
import { columns } from './columns'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Button, Input, Row, Col, Card } from 'reactstrap'

// ** Store & Actions
import { getData } from '../store'
import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import ComponentSpinner from "@components/spinner/Loading-spinner";
import Sidebar from "./Sidebar";

const CustomHeader = ({ handleFilter, value, toggleSidebar, handlePerPage, rowsPerPage }) => {
  return (
    <div className='invoice-list-table-header w-100 py-2'>
      <Row>
        <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
          <div className='d-flex align-items-center me-2'>
            <label htmlFor='rows-per-page'>نمایش</label>
            <Input
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              className='form-control ms-50 pe-3'
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </Input>
          </div>
        </Col>
        <Col
          lg='6'
          className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0'
        >
           <div className='d-flex align-items-center table-header-actions'>
      
              <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
                 فیلتر
              </Button>
           </div>
        </Col>
      </Row>
    </div>
  )
}

const NotificationsList = () => {
  // ** Store vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.notifications) || []

  // ** States
  const [value, setValue] = useState('')
  const [sort, setSort] = useState('desc')
  const [sortColumn, setSortColumn] = useState('id')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusValue, setStatusValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
   const [currentFilters, setCurrentFilters] = useState(null)
   const [sidebarOpen, setSidebarOpen] = useState(false)
  
   const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  useEffect(() => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
         filters:  currentFilters,
         
        status: statusValue
      })
    )
  }, [dispatch,currentFilters, store.data.length,currentPage])

  const handleFilter = val => {
    setValue(val)
    dispatch(
      getData({
        sort,
        q: val,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
         filters:  currentFilters,
         
        status: statusValue
      })
    )
  }

  const handlePerPage = e => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: currentPage,
        status: statusValue,
        perPage: parseInt(e.target.value)
      })
    )
    setRowsPerPage(parseInt(e.target.value))
     setCurrentPage(1)
  }

  const handleStatusValue = e => {
    setStatusValue(e.target.value)
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
         filters:  currentFilters,
         
        status: e.target.value
      })
    )
  }

  const handlePagination = page => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        status: statusValue,
        perPage: rowsPerPage,
         filters:  currentFilters,
         
        page: page.selected + 1
      })
    )
    setCurrentPage(page.selected + 1)
    
  }

  const CustomPagination = () => {
           const count = Number(Math.ceil(store.total / rowsPerPage).toFixed(0))


    return (
      <ReactPaginate
        nextLabel=''
        breakLabel='...'
        previousLabel=''
        pageCount={count || 1}
        activeClassName='active'
        breakClassName='page-item'
        pageClassName={'page-item'}
        breakLinkClassName='page-link'
        nextLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousLinkClassName={'page-link'}
        previousClassName={'page-item prev'}
        onPageChange={page => handlePagination(page)}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        containerClassName={'pagination react-paginate justify-content-end p-1'}
      />
    )
  }

  const dataToRender = () => {
    const filters = {
      q: value,
      status: statusValue
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getData({
        q: value,
        page: currentPage,
        sort: sortDirection,
        status: statusValue,
        perPage: rowsPerPage,
         filters:  currentFilters,
         
        sortColumn: column.sortField
      })
    )
  }
     const customStyles = {
          
          rows: {
               
               style: {
                    minHeight:rowsPerPage - ((rowsPerPage * currentPage) - store.total) === 1
                         ? '200px' :rowsPerPage - ((rowsPerPage * currentPage) - store.total) === 2 ? '110px' :"72px", // override
                    // the row
                    // height
               },
          },
     };
  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <div className='invoice-list-dataTable react-dataTable'>
          <DataTable
            noHeader
            pagination
               customStyles={customStyles}
               progressPending={store.isLoading}
               progressComponent={<ComponentSpinner  className='content-loader-table' />}
               sortServer
               noDataComponent="داده ای وجود ندارید"
            paginationServer
            subHeader={true}
            columns={columns}
            responsive={true}
            onSort={handleSort}
            data={dataToRender()}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortField='invoiceId'
            paginationDefaultPage={currentPage}
            paginationComponent={CustomPagination}
            subHeaderComponent={
              <CustomHeader
                value={value}
                statusValue={statusValue}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                   toggleSidebar={toggleSidebar}
                   
                handlePerPage={handlePerPage}
                handleStatusValue={handleStatusValue}
              />
            }
          />
        </div>
      </Card>
       <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} setCurrentFilters={setCurrentFilters}/>
       
    </div>
  )
}

export default NotificationsList
