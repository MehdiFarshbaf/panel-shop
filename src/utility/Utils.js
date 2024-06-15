import {DefaultRoute} from '../router/routes'
import {toast} from "react-toastify"
import moment from "jalali-moment"
import Swal from "sweetalert2"
import API from "@src/utility/API"
// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = obj => Object.keys(obj).length === 0

// ** Returns K format from a number
export const kFormatter = num => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

// ** Converts HTML to string
export const htmlToString = html => html.replace(/<\/?[^>]+(>|$)/g, '')

// ** Checks if the passed date is today
const isToday = date => {
    const today = new Date()
    return (
        /* eslint-disable operator-linebreak */
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
        /* eslint-enable */
    )
}

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (value, formatting = {month: 'short', day: 'numeric', year: 'numeric'}) => {
    if (!value) return value
    return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
    const date = new Date(value)
    let formatting = {month: 'short', day: 'numeric'}

    if (toTimeForCurrentDay && isToday(date)) {
        formatting = {hour: 'numeric', minute: 'numeric'}
    }

    return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem('userData')
export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful.
 * However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = userRole => {
    if (userRole) return DefaultRoute
    return '/login'
}

// ** React Select Theme Colors
export const selectThemeColors = theme => ({
    ...theme,
    colors: {
        ...theme.colors,
        primary25: '#7367f01a', // for option hover bg-color
        primary: '#7367f0', // for selected option bg-color
        neutral10: '#7367f0', // for tags bg-color
        neutral20: '#ededed', // for input border-color
        neutral30: '#ededed' // for input hover border-color
    }
})


export const handleShowErrorMessage = async (error) => {
    // console.log(error)
    // if (error.status === 422 && error.data.errors) {
    //   const keys = Object.keys(error.data.errors)
    // toast.error(error.data.errors[keys[0]][0])
    // }
    if (error.errors) {
        const keys = Object.keys(error.errors)
        toast.error(error.errors[keys[0]][0])
    } else {
        toast.error(error.message)
    }
}

export const showPersianDate = (date) => {
    return moment(date).locale("fa").format("DD/MMM/YYYY")
}

export const handleDeleteAPI = async (address) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger mr-2 mx-2"
        },
        buttonsStyling: false
    })
    const result = await swalWithBootstrapButtons.fire({
        title: "آیا مطمئن هستید!",
        text: "برای حذف تایید را بزنید",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "تایید",
        cancelButtonText: "لغو",
        reverseButtons: true
    })
    if (result.isConfirmed) {
        try {
            const {data} = await API.delete(address)
            if (data.success) {
                swalWithBootstrapButtons.fire("حذف شد!", data?.message, "success")
                return data
            } else {
                swalWithBootstrapButtons.fire("خطا!", "عملیات با خطا مواجه شد دوباره امتحان کنید", "error")
            }
        } catch (err) {
            await handleShowErrorMessage(err)
        }
    } else {
        swalWithBootstrapButtons.close()
    }
}