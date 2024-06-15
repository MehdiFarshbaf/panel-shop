import {Card, Spinner} from "reactstrap";

const MySpinner = () => {
    return (
        <Card>
            <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                <Spinner className="mt-5 mb-5"/>
                <h3 className=" mb-5">لطفا منتظر بمانید</h3>
            </div>
        </Card>
    )
}
export default MySpinner