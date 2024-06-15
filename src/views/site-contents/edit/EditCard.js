// ** React Imports
import {Fragment, useState} from "react"

// ** Custom Components
// ** Third Party Components
// ** Reactstrap Imports
import {Button, Card, CardBody, Col, Form, FormFeedback, Input, Label, Row} from "reactstrap"

// ** Styles
import "react-slidedown/lib/slidedown.css"
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/base/pages/app-invoice.scss"
import {Controller, useForm} from "react-hook-form"
import "cleave.js/dist/addons/cleave-phone.us"
import axios from "axios"
import toast from "react-hot-toast"
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"

const EditCard = ({currentData: data}) => {
    const dataPer = JSON.parse(localStorage.getItem("userData"))
    const [isLoading, setIsLoading] = useState(false)
    const {languages, currencies} = useSelector(state => state.navbar)


    const navigate = useNavigate()

    // ** Hooks
    const defaultValues = {
        linkedin: data.linkedin,
        expired_ad_period: data?.expired_ad_period ? data.expired_ad_period : 0,
        fori_ad_period: data?.fori_ad_period ? data.fori_ad_period : 0,
        instagram: data.instagram,
        twitter: data.twitter,
        facebook: data.facebook,
        googleplus: data.googleplus,
        telegram: data.telegram,
        whatsapp: data.whatsapp,
        appstore: data.appstore,
        sibapp: data.sibapp,
        googleplay: data.googleplay,
        bazaar: data.bazaar,
        tamdid_text: data.tamdid_text,
        ...languages.reduce((acc, language) => {
            acc[`tamdid_text_${language}`] = data[`tamdid_text_${language}`]
            acc[`nardeban_text_${language}`] = data[`nardeban_text_${language}`]
            acc[`fori_text_${language}`] = data[`fori_text_${language}`]
            acc[`footer_text_${language}`] = data[`footer_text_${language}`]

            return acc
        }, {}),
        ...currencies.reduce((acc, currency) => {
            acc[`tamdid_price_${currency}`] = data[`tamdid_price_${currency}`]
            acc[`nardeban_price_${currency}`] = data[`nardeban_price_${currency}`]
            acc[`fori_price_${currency}`] = data[`fori_price_${currency}`]
            return acc
        }, {}),
        phone1: data.phone1,
        phone2: data.phone2,
        footer_text: data.footer_text,
        tamdid_price: data.tamdid_price,
        nardeban_text: data.nardeban_text,
        fori_text: data.fori_text,
        fori_price: data.fori_price,
        email: data.email,
        nardeban_price: data.nardeban_price

    }
    const {
        control,
        setError,
        handleSubmit,
        formState: {errors}
    } = useForm({defaultValues})

    const onSubmit = dataSend => {
        setIsLoading(true)

        const dataInfo = new FormData()
        const {
            linkedin,
            instagram,
            twitter,
            facebook,
            googleplus,
            telegram,
            whatsapp,
            appstore,
            sibapp,
            googleplay,
            bazaar,
            tamdid_text,
            tamdid_price,
            nardeban_text,
            fori_text,
            fori_price,
            email,
            footer_text,
            phone1, phone2,
            nardeban_price, expired_ad_period, fori_ad_period
        } = dataSend
        dataInfo.append("fori_ad_period", fori_ad_period)
        dataInfo.append("expired_ad_period", expired_ad_period)
        dataInfo.append("linkedin", linkedin)
        dataInfo.append("instagram", instagram)
        dataInfo.append("twitter", twitter)
        dataInfo.append("facebook", facebook)
        dataInfo.append("googleplus", googleplus)
        dataInfo.append("telegram", telegram)
        dataInfo.append("telegram", telegram)
        dataInfo.append("whatsapp", whatsapp)
        dataInfo.append("appstore", appstore)
        dataInfo.append("sibapp", sibapp)
        dataInfo.append("googleplay", googleplay)
        dataInfo.append("bazaar", bazaar)
        dataInfo.append("tamdid_text", tamdid_text)
        dataInfo.append("tamdid_price", tamdid_price)
        dataInfo.append("nardeban_text", nardeban_text)
        dataInfo.append("fori_text", fori_text)
        dataInfo.append("footer_text", footer_text)
        dataInfo.append("phone1", phone1)
        dataInfo.append("phone2", phone2)
        dataInfo.append("nardeban_price", nardeban_price)
        dataInfo.append("email", email)
        dataInfo.append("fori_price", fori_price)
        for (let i = 0; i < languages.length; i++) {
            dataInfo.append(`footer_text_${languages[i]}`, dataSend[`footer_text_${languages[i]}`])
            dataInfo.append(`nardeban_text_${languages[i]}`, dataSend[`nardeban_text_${languages[i]}`])
            dataInfo.append(`fori_text_${languages[i]}`, dataSend[`fori_text_${languages[i]}`])
            dataInfo.append(`tamdid_text_${languages[i]}`, dataSend[`tamdid_text_${languages[i]}`])
        }
        for (let i = 0; i < currencies.length; i++) {
            dataInfo.append(`fori_price_${currencies[i]}`, dataSend[`fori_price_${currencies[i]}`])
            dataInfo.append(`nardeban_price_${currencies[i]}`, dataSend[`nardeban_price_${currencies[i]}`])
            dataInfo.append(`tamdid_price_${currencies[i]}`, dataSend[`tamdid_price_${currencies[i]}`])
        }

        axios.post(`/footer`, dataInfo
        ).then(res => {

                if (res.status === 200) {

                    toast.success("با موفقیت عملیات انجام شد")
                    navigate("/site-content/setting/edit")
                }

            }
        ).catch((e) => setIsLoading(false))

    }

    return (
        <Fragment>
            <Form className="mt-2 pt-50" onSubmit={handleSubmit(onSubmit)}>
                {/*networks and app*/}
                <Card className="invoice-preview-card">
                    <CardBody className="py-2 my-25">
                        <Row>

                            <Col sm="6" className="mb-1">
                                <Label className="form-label" for="facebook">
                                    فیسبوک
                                </Label>
                                <Controller
                                    name="facebook"
                                    control={control}
                                    render={({field}) => (
                                        <Input id="facebook"
                                               placeholder="فیسبوک"
                                               invalid={errors.facebook && true} {...field} />
                                    )}
                                />
                            </Col>
                            <Col sm="6" className="mb-1">
                                <Label className="form-label" for="twitter">
                                    تویتتر
                                </Label>
                                <Controller
                                    name="twitter"
                                    control={control}
                                    render={({field}) => (
                                        <Input id="twitter"
                                               placeholder="تویتتر"
                                               invalid={errors.twitter && true} {...field} />
                                    )}
                                />
                            </Col>
                            <Col sm="6" className="mb-1">
                                <Label className="form-label" for="whatsapp">
                                    واتس آپ
                                </Label>
                                <Controller
                                    name="whatsapp"
                                    control={control}
                                    render={({field}) => (
                                        <Input id="whatsapp" placeholder="واتس آپ"
                                               invalid={errors.whatsapp && true} {...field} />
                                    )}
                                />
                            </Col>
                            <Col sm="6" className="mb-1">
                                <Label className="form-label" for="telegram">
                                    تلگرام
                                </Label>
                                <Controller
                                    name="telegram"
                                    control={control}
                                    render={({field}) => (
                                        <Input id="telegram" placeholder="تلگرام"
                                               invalid={errors.telegram && true} {...field} />
                                    )}
                                />
                            </Col>
                            <Col sm="6" className="mb-1">
                                <Label className="form-label" for="linkedin">
                                    لینکدین
                                </Label>
                                <Controller
                                    name="linkedin"
                                    control={control}
                                    render={({field}) => (
                                        <Input id="linkedin" placeholder="لینکدین"
                                               invalid={errors.linkedin && true} {...field} />
                                    )}
                                />
                            </Col>
                            <Col sm="6" className="mb-1">
                                <Label className="form-label" for="instagram">
                                    اینستاگرام
                                </Label>
                                <Controller
                                    name="instagram"
                                    control={control}
                                    render={({field}) => (
                                        <Input id="instagram" placeholder="اینستاگرام"
                                               invalid={errors.instagram && true} {...field} />
                                    )}
                                />
                            </Col>
                            <hr className="invoice-spacing"/>
                            <Col sm="6" className="mb-1">
                                <Label className="form-label" for="appstore">
                                    اپ استور
                                </Label>
                                <Controller
                                    name="appstore"
                                    control={control}
                                    render={({field}) => (
                                        <Input id="appstore" placeholder="آپ استور"
                                               invalid={errors.appstore && true} {...field} />
                                    )}
                                />
                            </Col>
                            <Col sm="6" className="mb-1">
                                <Label className="form-label" for="bazaar">
                                    بازار
                                </Label>
                                <Controller
                                    name="bazaar"
                                    control={control}
                                    render={({field}) => (
                                        <Input id="bazaar" placeholder="بازار"
                                               invalid={errors.bazaar && true} {...field} />
                                    )}
                                />
                            </Col>
                            <Col sm="6" className="mb-1">
                                <Label className="form-label" for="googleplay">
                                    گوگل پلی
                                </Label>
                                <Controller
                                    name="googleplay"
                                    control={control}
                                    render={({field}) => (
                                        <Input id="googleplay" placeholder="گوگل پلی"
                                               invalid={errors.googleplay && true} {...field} />
                                    )}
                                />
                            </Col>
                            <Col sm="6" className="mb-1">
                                <Label className="form-label" for="sibapp">
                                    سیب اپ
                                </Label>
                                <Controller
                                    name="sibapp"
                                    control={control}
                                    render={({field}) => (
                                        <Input id="sibapp" placeholder="سیب اپ"
                                               invalid={errors.sibapp && true} {...field} />
                                    )}
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                <Card className="invoice-preview-card">
                    <CardBody className="py-2 my-25">
                        <Row>
                            <Col sm="6" className="mb-1">
                                <Label className="form-label" for="expired_ad_period">تعداد روز برای اعتبار آگهی</Label>
                                <Controller
                                    name="expired_ad_period"
                                    control={control}
                                    render={({field}) => (
                                        <Input id="expired_ad_period" type="number" placeholder="تعداد روز"
                                               invalid={errors.expired_ad_period && true} {...field} />
                                    )}
                                />
                            </Col>
                            <Col sm="6" className="mb-1">
                                <Label className="form-label" for="fori_ad_period">تعداد روز برای آگهی فوری</Label>
                                <Controller
                                    name="fori_ad_period"
                                    control={control}
                                    render={({field}) => (
                                        <Input id="fori_ad_period" type="number" placeholder="تعداد روز"
                                               invalid={errors.fori_ad_period && true} {...field} />
                                    )}
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                {/*footer*/}
                <Card className="invoice-preview-card">
                    <CardBody className="py-2 my-25">
                        <Row>
                            <Col sm="6" className="mb-1">
                                <Label className="form-label" for="footer_text">
                                    متن فوتر
                                </Label>
                                <Controller
                                    name="footer_text"
                                    control={control}
                                    render={({field}) => (
                                        <Input id="footer_text" placeholder="متن فوتر"
                                               invalid={errors.footer_text && true} {...field} />
                                    )}
                                />
                            </Col>
                            {
                                languages.map(language => {
                                    return <Col sm="6" className="mb-1">
                                        <Label className="form-label" for={`footer_text_${language}`}>
                                            متن فوتر {language}

                                        </Label>
                                        <Controller
                                            name={`footer_text_${language}`}
                                            control={control}
                                            render={({field}) => (
                                                <Input id={`footer_text_${language}`}
                                                       placeholder="متن فوتر "
                                                       invalid={errors[`footer_text_${language}`] && true} {...field} />
                                            )}
                                        />
                                        {errors[`footer_text_${language}`] && (
                                            <FormFeedback>{errors[`footer_text_${language}`].message}</FormFeedback>
                                        )}
                                    </Col>
                                })
                            }

                            <Col sm="6" className="mb-1">
                                <Label className="form-label" for="email">
                                    ایمیل
                                </Label>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({field}) => (
                                        <Input id="email" placeholder="ایمیل"
                                               invalid={errors.email && true} {...field} />
                                    )}
                                />
                            </Col>
                            <Col sm="6" className="mb-1">
                                <Label className="form-label" for="phone1">
                                    شماره تماس یک
                                </Label>
                                <Controller
                                    name="phone1"
                                    control={control}
                                    render={({field}) => (
                                        <Input id="phone1" placeholder=" شماره تماس یک"
                                               type={"number"}
                                               invalid={errors.phone1 && true} {...field} />
                                    )}
                                />
                            </Col>
                            <Col sm="6" className="mb-1">
                                <Label className="form-label" for="phone2">
                                    شماره تماس دوم
                                </Label>
                                <Controller
                                    name="phone2"
                                    control={control}
                                    render={({field}) => (
                                        <Input id="phone2" placeholder=" شماره تماس دوم"
                                               type={"number"}
                                               invalid={errors.phone2 && true} {...field} />
                                    )}
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                {/*Instant plan*/}
                <Card className="invoice-preview-card">
                    <CardBody className="py-2 my-25">
                        <Row>
                            <Row>
                                <Col sm="6" className="mb-1">
                                    <Label className="form-label" for="fori_price">
                                        قیمت پلن فوری
                                    </Label>
                                    <Controller
                                        name="fori_price"
                                        control={control}
                                        render={({field}) => (
                                            <Input id="fori_price" placeholder=" قیمت پلن فوری"
                                                   type={"number"}
                                                   invalid={errors.fori_price && true} {...field} />
                                        )}
                                    />
                                </Col>
                                {
                                    currencies.map(currency => {
                                        return <Col sm="6" className="mb-1">
                                            <Label className="form-label" for={`fori_price_${currency}`}>
                                                قیمت پلن فوری {currency}

                                            </Label>
                                            <Controller
                                                name={`fori_price_${currency}`}
                                                control={control}
                                                render={({field}) => (
                                                    <Input id={`fori_price_${currency}`}
                                                           placeholder="  قیمت پلن فوری"
                                                           type={"number"}

                                                           invalid={errors[`fori_price_${currency}`] && true} {...field} />
                                                )}
                                            />
                                            {errors[`fori_price_${currency}`] && (
                                                <FormFeedback>{errors[`fori_price_${currency}`].message}</FormFeedback>
                                            )}
                                        </Col>
                                    })
                                }
                            </Row>
                            <hr className="invoice-spacing"/>
                            <Col sm="6" className="mb-1">
                                <Label className="form-label" for="fori_text">
                                    متن پلن فوری
                                </Label>
                                <Controller
                                    name="fori_text"
                                    control={control}
                                    render={({field}) => (
                                        <Input id="fori_text" placeholder=" متن پلن فوری"
                                               invalid={errors.fori_text && true} {...field} />
                                    )}
                                />
                            </Col>

                            {
                                languages.map(language => {
                                    return <Col sm="6" className="mb-1">
                                        <Label className="form-label" for={`fori_text_${language}`}>
                                            متن پلن فوری {language}

                                        </Label>
                                        <Controller
                                            name={`fori_text_${language}`}
                                            control={control}
                                            render={({field}) => (
                                                <Input id={`fori_text_${language}`}
                                                       placeholder=" متن پلن فوری"
                                                       invalid={errors[`fori_text_${language}`] && true} {...field} />
                                            )}
                                        />
                                        {errors[`fori_text_${language}`] && (
                                            <FormFeedback>{errors[`fori_text_${language}`].message}</FormFeedback>
                                        )}
                                    </Col>
                                })
                            }

                        </Row>
                    </CardBody>
                </Card>
                {/*Ladder plan*/}
                <Card className="invoice-preview-card">
                    <CardBody className="py-2 my-25">
                        <Row>
                            <Row>
                                <Col sm="6" className="mb-1">
                                    <Label className="form-label" for="nardeban_price">
                                        قیمت پلن نردبان
                                    </Label>
                                    <Controller
                                        name="nardeban_price"
                                        control={control}
                                        render={({field}) => (
                                            <Input id="nardeban_price" placeholder="قیمت پلن نردبان"
                                                   type={"number"}
                                                   invalid={errors.nardeban_price && true} {...field} />
                                        )}
                                    />
                                </Col>

                                {
                                    currencies.map(currency => {
                                        return <Col sm="6" className="mb-1">
                                            <Label className="form-label" for={`nardeban_price_${currency}`}>
                                                قیمت پلن نردبان {currency}

                                            </Label>
                                            <Controller
                                                name={`nardeban_price_${currency}`}
                                                control={control}
                                                render={({field}) => (
                                                    <Input id={`nardeban_price_${currency}`}
                                                           placeholder="  قیمت پلن نردبان"
                                                           type={"number"}

                                                           invalid={errors[`nardeban_price_${currency}`] && true} {...field} />
                                                )}
                                            />
                                            {errors[`nardeban_price_${currency}`] && (
                                                <FormFeedback>{errors[`nardeban_price_${currency}`].message}</FormFeedback>
                                            )}
                                        </Col>
                                    })
                                }
                            </Row>
                            <hr className="invoice-spacing"/>
                            <Col sm="6" className="mb-1">
                                <Label className="form-label" for="nardeban_text">
                                    متن پلن نردبان
                                </Label>
                                <Controller
                                    name="nardeban_text"
                                    control={control}
                                    render={({field}) => (
                                        <Input id="nardeban_text" placeholder="متن پلن نردبان"
                                               invalid={errors.nardeban_text && true} {...field} />
                                    )}
                                />
                            </Col>
                            {
                                languages.map(language => {
                                    return <Col sm="6" className="mb-1">
                                        <Label className="form-label" for={`nardeban_text_${language}`}>
                                            متن پلن نردبان {language}

                                        </Label>
                                        <Controller
                                            name={`nardeban_text_${language}`}
                                            control={control}
                                            render={({field}) => (
                                                <Input id={`nardeban_text_${language}`}
                                                       placeholder=" متن پلن نردبان"
                                                       invalid={errors[`nardeban_text_${language}`] && true} {...field} />
                                            )}
                                        />
                                        {errors[`nardeban_text_${language}`] && (
                                            <FormFeedback>{errors[`nardeban_text_${language}`].message}</FormFeedback>
                                        )}
                                    </Col>
                                })
                            }


                        </Row>
                    </CardBody>
                </Card>
                {/*Extension plan*/}
                <Card className="invoice-preview-card">
                    <CardBody className="py-2 my-25">
                        <Row>
                            <Col sm="6" className="mb-1">
                                <Label className="form-label" for="tamdid_price">
                                    قیمت تمدید
                                </Label>
                                <Controller
                                    name="tamdid_price"
                                    control={control}
                                    render={({field}) => (
                                        <Input id="tamdid_price" placeholder=" قیمت تمدید"
                                               type={"number"}
                                               invalid={errors.tamdid_price && true} {...field} />
                                    )}
                                />
                            </Col>
                            {
                                currencies.map(currency => {
                                    return <Col sm="6" className="mb-1">
                                        <Label className="form-label" for={`tamdid_price_${currency}`}>
                                            قیمت تمدید {currency}

                                        </Label>
                                        <Controller
                                            name={`tamdid_price_${currency}`}
                                            control={control}
                                            render={({field}) => (
                                                <Input id={`tamdid_price_${currency}`}
                                                       placeholder="  قیمت تمدید"
                                                       type={"number"}

                                                       invalid={errors[`tamdid_price_${currency}`] && true} {...field} />
                                            )}
                                        />
                                        {errors[`tamdid_price_${currency}`] && (
                                            <FormFeedback>{errors[`tamdid_price_${currency}`].message}</FormFeedback>
                                        )}
                                    </Col>
                                })
                            }
                            <hr className="invoice-spacing"/>


                            <Col sm="6" className="mb-1">
                                <Label className="form-label" for="tamdid_text">
                                    متن تمدید
                                </Label>
                                <Controller
                                    name="tamdid_text"
                                    control={control}
                                    render={({field}) => (
                                        <Input id="tamdid_text" placeholder=" متن تمدید"
                                               invalid={errors.tamdid_text && true} {...field} />
                                    )}
                                />
                            </Col>
                            {
                                languages.map(language => {
                                    return <Col sm="6" className="mb-1">
                                        <Label className="form-label" for={`tamdid_text_${language}`}>
                                            متن تمدید {language}

                                        </Label>
                                        <Controller
                                            name={`tamdid_text_${language}`}
                                            control={control}
                                            render={({field}) => (
                                                <Input id={`tamdid_text_${language}`}
                                                       placeholder="متن تمدید"
                                                       invalid={errors[`tamdid_text_${language}`] && true} {...field} />
                                            )}
                                        />
                                        {errors[`tamdid_text_${language}`] && (
                                            <FormFeedback>{errors[`tamdid_text_${language}`].message}</FormFeedback>
                                        )}
                                    </Col>
                                })
                            }

                            {

                                dataPer?.role.permissions?.find(permission => permission.key.trim() === "SETTINGS_UPDATE".trim()) &&
                                <Col className="mt-2" sm="12">
                                    <Button type="submit" className="me-1" color="primary">
                                        {isLoading ? "در حال بارگذاری" : "ذخیره تغییرات"}

                                    </Button>
                                    <Button onClick={() => navigate(-1)} type="reset" color="secondary"
                                            outline>
                                        لغو
                                    </Button>
                                </Col>

                            }

                        </Row>

                    </CardBody>

                </Card>
            </Form>

        </Fragment>
    )
}

export default EditCard
