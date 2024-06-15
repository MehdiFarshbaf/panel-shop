import {Fragment, useEffect, useState} from "react";
import {Button, Card, CardBody, CardHeader, Col, Input, Label, Row} from "reactstrap";
import Select from "react-select";
import {selectThemeColors} from "@utils";
import axios from "axios";
import {toast} from "react-toastify";

const Wallets = ({wallets, initData}) => {

    const [network, setNetwork] = useState(null)
    const [name, setName] = useState('')
    const [address, setAddress] = useState("")
    const [loading, setLoading] = useState(false)
    const options = [
        {label: "ERC20", value: "ERC20"},
        {label: "TRC20", value: "TRC20"}]

    const updateDate = async () => {
        if (network) {
            const obj = await wallets.find(item => item.network === network.value)
            await setAddress(obj.address)
            await setName(obj.name)
        }
    }

    const handleEdit = async () => {
        const data = {
            [network.value]:
                {
                    name,
                    network: network.value,
                    address
                }
        }
        setLoading(true)
        try {
            const res = await axios.post("/pages/tether_wallet", data)
            if (res.status === 200) {
                toast.success("به روز رسانی با موفقیت انجام شد.")
                setLoading(false)
            }
        } catch (err) {
            console.log(err)
            setLoading(false)
            initData()
        }
    }
    useEffect(() => {
        updateDate()
    }, [network])
    return (
        <Fragment>
            <Card>
                <CardHeader>مدیریت کیف های پول</CardHeader>
                <CardBody>
                    <Row>
                        <Col sm="6" className="mb-1">
                            <Label className='form-label' for='network'>انتخاب شبکه</Label>
                            <Select placeholder="شبکه مورد نظر را انتخاب کنید" theme={selectThemeColors}
                                    defaultValue={network}
                                    onChange={setNetwork}
                                    options={options}/>
                        </Col>
                        {network && <Col sm="6" className="mb-1">
                            <Label className='form-label' for='network'>نام شبکه</Label>
                            <Input type="text" id="farsiText" className="inputEnglish"
                                   value={name}
                                   onChange={e => setName(e.target.value)}
                                   placeholder="نام شبکه"/>
                        </Col>}
                        {network && <Col sm="6" className="mb-1">
                            <Label className='form-label' for='network'>آدرس شبکه</Label>
                            <Input type="text" id="farsiText" className="inputEnglish"
                                   value={address}
                                   onChange={e => setAddress(e.target.value)}
                                   placeholder="آدرس شبکه"/>
                        </Col>}
                    </Row>
                    <Row>
                        <Col sm="6" className="mb-1">
                            {network && <Button color="primary" disable={loading}
                                                onClick={() => handleEdit()}>{loading ? "لطفا منتظر بمانید" : "ذخیره"}</Button>}
                        </Col>
                    </Row>
                </CardBody>
            </Card>

        </Fragment>
    )
}
export default Wallets