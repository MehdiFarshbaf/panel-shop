// ** React Imports
import { Fragment, useEffect, useState } from "react"

// ** Invoice List Sidebar
// ** Table Columns
import { columns } from "./columns"

// ** Store & Actions
import { getData } from "../store"
import { useDispatch, useSelector } from "react-redux"

// ** Third Party Components
import ReactPaginate from "react-paginate"
import DataTable from "react-data-table-component"
import { ChevronDown } from "react-feather"

// ** Utils
// ** Reactstrap Imports
import { Button, Card, Col, Input, Row } from "reactstrap"

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/tables/react-dataTable-component.scss"
import Sidebar from "./SidebarAdd"
import SidebarEdit from "@src/views/discount/list/SidebarEdit"
import ComponentSpinner from "@components/spinner/Loading-spinner";

// ** Table Header
const data = JSON.parse(localStorage.getItem('userData'))

const CustomHeader = ({
                            toggleSidebar,
                            handlePerPage,
                            rowsPerPage,
                       }) => {
     
     return (
          <div className = "invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75" >
               <Row >
                    <Col xl = "6" className = "d-flex align-items-center p-0 px-lg-1" >
                         <div className = "d-flex align-items-center me-2" >
                              <label htmlFor = "rows-per-page" >نمایش</label >
                              <Input
                                   type = "select"
                                   id = "rows-per-page"
                                   value = { rowsPerPage }
                                   onChange = { handlePerPage }
                                   className = "form-control ms-50 pe-3"
                              >
                                   <option value = "10" >10</option >
                                   <option value = "25" >25</option >
                                   <option value = "100" >100</option >
                              </Input >
                         </div >
                            {
                               data?.role.permissions?.find(permission => permission.key.trim() === "DISCOUNTS_CREATE".trim()) &&
                                 <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
                                    اضافه کردن
                                 </Button>
                       }
                    
                    </Col >
               </Row >
          </div >
     )
}

const TableList = () => {
     // ** Store Vars
     const dispatch = useDispatch()
     const store = useSelector(state => state.discount)
     
     // ** States
     const [sort, setSort] = useState("desc")
     const [searchTerm, setSearchTerm] = useState("")
     const [currentPage, setCurrentPage] = useState(1)
     const [sortColumn, setSortColumn] = useState("id")
     const [rowsPerPage, setRowsPerPage] = useState(10)
     const [sidebarOpen, setSidebarOpen] = useState(false)
     const [sidebarEditOpen, setSidebarEditOpen] = useState(false)
     const [currentFilters, setCurrentFilters] = useState(null)
     
     // ** Function to toggle sidebar
     const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
     const toggleEditSidebar = () => setSidebarEditOpen(!sidebarEditOpen)
   useEffect(() => {
      if (store.currentDiscount !== null) {
         setSidebarEditOpen(true)
         
      }
   
   }, [store.currentDiscount])
     // ** Get data on mount
     useEffect(() => {
          dispatch(
               getData({
                    sort,
                    sortColumn,
                    q       : searchTerm,
                    page    : currentPage,
                    perPage : rowsPerPage,
                    filters : currentFilters 
               })
          )
     }, [dispatch, store.data.length, sort, sortColumn, currentFilters, currentPage])
     
     // ** Function in get data on page change
     const handlePagination = page => {
          dispatch(
               getData({
                    sort,
                    sortColumn,
                    q       : searchTerm,
                    perPage : rowsPerPage,
                    page    : page.selected + 1,
                    filters : currentFilters 
                    
               })
          )
          setCurrentPage(page.selected + 1)
     }
     
     // ** Function in get data on rows per page
     const handlePerPage = e => {
          const value = parseInt(e.currentTarget.value)
          dispatch(
               getData({
                    sort,
                    sortColumn,
                    q       : searchTerm,
                    perPage : value,
                    page    : currentPage,
                    filters : currentFilters 
                    
               })
          )
          setRowsPerPage(value)
        setCurrentPage(1)
        
     }
     
     // ** Function in get data on search query change
     const handleFilter = val => {
          setSearchTerm(val)
          dispatch(
               getData({
                    sort,
                    q       : val,
                    sortColumn,
                    page    : currentPage,
                    perPage : rowsPerPage,
                    filters : currentFilters 
                    
               })
          )
     }
     
     // ** Custom Pagination
     const CustomPagination = () => {
          const count = Number(Math.ceil(store.total / rowsPerPage))
          
          return (
               <ReactPaginate
                    previousLabel = { "" }
                    nextLabel = { "" }
                    pageCount = { count || 1 }
                    activeClassName = "active"
                    forcePage = { currentPage !== 0 ? currentPage - 1 : 0 }
                    onPageChange = { page => handlePagination(page) }
                    pageClassName = { "page-item" }
                    nextLinkClassName = { "page-link" }
                    nextClassName = { "page-item next" }
                    previousClassName = { "page-item prev" }
                    previousLinkClassName = { "page-link" }
                    pageLinkClassName = { "page-link" }
                    containerClassName = { "pagination react-paginate justify-content-end my-2 pe-1" }
               />
          )
     }
     
     // ** Table data to render
     const dataToRender = () => {
          const filters = {
               
               q : searchTerm
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
                    sort,
                    sortColumn,
                    q       : searchTerm,
                    page    : currentPage,
                    perPage : rowsPerPage 
                    
               })
          )
     }
     const customStyles = {
          
          rows : {
               
               style : {
                    minHeight :rowsPerPage - ((rowsPerPage * currentPage) - store.total) === 1 ?
                         "200px" :rowsPerPage - ((rowsPerPage * currentPage) - store.total) === 2 ? "100px" : "80px" // override
                    // the row
                    // height
               }
          }
     }
     return (
          <Fragment >
               
               <Card className = "overflow-hidden" >
                    <div className = "react-dataTable" >
                         <DataTable
                              noHeader
                              subHeader
                              sortServer
                              customStyles = { customStyles }
                              pagination
                              responsive
                              paginationServer
                              columns = { columns }
                              noDataComponent = "داده ای وجود ندارد"
                              progressPending={store.isLoading}
                              progressComponent={<ComponentSpinner  className='content-loader-table' />}
                              onSort = { handleSort }
                              sortIcon = { <ChevronDown /> }
                              className = "react-dataTable"
                              paginationComponent = { CustomPagination }
                              data = { dataToRender() }
                              subHeaderComponent = {
                                   <CustomHeader
                                        store = { store }
                                        searchTerm = { searchTerm }
                                        rowsPerPage = { rowsPerPage }
                                        handleFilter = { handleFilter }
                                        handlePerPage = { handlePerPage }
                                        toggleSidebar = { toggleSidebar }
                                   />
                              }
                         />
                    </div >
               </Card >
             <Sidebar open = { sidebarOpen } toggleSidebar = { toggleSidebar }
                   />
             {store.currentDiscount !== null &&
                  <SidebarEdit open = { sidebarEditOpen } toggleSidebar = { toggleEditSidebar }
                 currentData={store.currentDiscount} />
             }
          </Fragment >
     )
}

export default TableList
