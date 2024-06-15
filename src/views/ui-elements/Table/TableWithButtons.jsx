// ** React Imports
import {Fragment, useState, forwardRef} from "react"


// ** Third Party Components
import ReactPaginate from "react-paginate"
import DataTable from "react-data-table-component"
import {ChevronDown} from "react-feather"
import {Card} from "reactstrap"

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({onClick, ...rest}, ref) => (
    <div className="custom-control custom-checkbox">
        <input
            type="checkbox"
            className="custom-control-input"
            ref={ref}
            {...rest}
        />
        <label className="custom-control-label" onClick={onClick}/>
    </div>
))

const TableWithButtons = ({data, columns, showPagination = true, emptyMessage = "داده ای وجود ندارد"}) => {
    // ** States
    const [modal, setModal] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState("")
    const [filteredData, setFilteredData] = useState([])

    // ** Function to handle Modal toggle
    const handleModal = () => setModal(!modal)

    // ** Function to handle Pagination
    const handlePagination = (page) => {
        setCurrentPage(page.selected)
    }

    // ** Custom Pagination
    const CustomPagination = () => (
        <ReactPaginate
            previousLabel=""
            nextLabel=""
            forcePage={currentPage}
            onPageChange={(page) => handlePagination(page)}
            pageCount={
                searchValue.length ? filteredData.length / 10 : data.length / 10 || 1
            }
            breakLabel="..."
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeClassName="active"
            pageClassName="page-item"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            nextLinkClassName="page-link"
            nextClassName="page-item next"
            previousClassName="page-item prev"
            previousLinkClassName="page-link"
            pageLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1"
        />
    )

    // ** Converts table to CSV
    function convertArrayOfObjectsToCSV(array) {
        let result

        const columnDelimiter = ","
        const lineDelimiter = "\n"
        const keys = Object.keys(data[0])

        result = ""
        result += keys.join(columnDelimiter)
        result += lineDelimiter

        array.forEach((item) => {
            let ctr = 0
            keys.forEach((key) => {
                if (ctr > 0) result += columnDelimiter
                result += item[key]
                ctr++
            })
            result += lineDelimiter
        })
        return result
    }

    // ** Downloads CSV
    function downloadCSV(array) {
        const link = document.createElement("a")
        let csv = convertArrayOfObjectsToCSV(array)
        if (csv === null) return

        const filename = "export.csv"

        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`
        }

        link.setAttribute("href", encodeURI(csv))
        link.setAttribute("download", filename)
        link.click()
    }

    const customStyles = {
        // rows: {
        //     style: {
        //         minHeight: '72px', // override the row height
        //     },
        // },
        headCells: {
            style: {
                // paddingLeft: '8px', // override the cell padding for head cells
                // paddingRight: '8px',
                fontWeight: "bold",
                fontSize: "16px"
            }
        },
        cells: {
            style: {
                fontFamily: "IRANSans !important"
            }
        }
    }


    return (
        <Fragment>
            <Card>
                <DataTable
                    noHeader
                    responsive={true}
                    pagination={showPagination && data.length > 10}
                    noDataComponent={emptyMessage}
                    customStyles={customStyles}
                    // selectableRows
                    // fixedHeader={true}
                    columns={columns}
                    paginationPerPage={10}
                    className="react-dataTable"
                    sortIcon={<ChevronDown size={10}/>}
                    paginationDefaultPage={currentPage + 1}
                    paginationComponent={CustomPagination}
                    data={searchValue.length ? filteredData : data}
                    // selectableRowsComponent={BootstrapCheckbox}
                />
            </Card>

        </Fragment>
    )
}

export default TableWithButtons
