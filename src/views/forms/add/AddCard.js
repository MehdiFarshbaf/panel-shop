// ** React Imports
import { Fragment, useState } from "react"

import {
   Alert,
   Button,
   Card,
   CardBody,
   Col,
   Form,
   FormFeedback,
   Input,
   Label,
   Row
} from "reactstrap"

// ** Styles
import Select, { components } from "react-select"
import "react-slidedown/lib/slidedown.css"
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/base/pages/app-invoice.scss"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import "cleave.js/dist/addons/cleave-phone.us"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import { useSelector } from "react-redux"

const OptionComponent = ({ data, ...props }) => {
   
   return (
        <components.Option { ...props }>
           <img src = { data.image } className = "me-50" height = { "30px" } width = { "30px" } />
           { data.label }
        </components.Option >
   )
}
const typeOptions = [
   { value : "text", label : "text" },
   { value : "switch", label : "switch" },
   { value : "select", label : "select" },
   // { value: 'limited_select', label: 'limited_select' }
   { value : "limited_select", label : "limited select" },
   { value : "range", label : "range" }
]

const AddCard = ({ categories, categoriesArray, forms }) => {
   
   // ** State
   const [isLoading, setIsLoading] = useState(false)
   const { languages } = useSelector(state => state.navbar)
   
   const navigate = useNavigate()
   const schema = yup.object().shape({
      options: yup.array().of(
           yup.object().shape({
              name: yup
                   .string()
                   .matches(/^[a-zA-Z@$#^&!@#$%^&*()[\]{};':"\\|,.<>/?`~_+=-][a-zA-Z0-9@$#^&!@#$%^&*()[\]{};':"\\|,.<>/?`~_+=-]*$/, 'نام باید انگلیسی باشد و به صورت camelCase')
                   .required('نام الزامی است')
           })
      )
   })
   const defaultValues = {
      title             : "",
      description       : "",
      image             : "",
      activeMap         : false,
      activeImage       : false,
      max               : null,
      cat_name          : null,
      hideExactLocation : false,
      subCategory       : null,
      innerCategory     : null,
      category          : null,
      activeVirtualTour : false,
      exchange : false,
      consensualAd : false,
      deposit : false,
      activePrice : false,
      installment : false,
      options           : null
      
   }
   
   const {
            control,
            handleSubmit, watch, setValue, register,
            formState : { errors }
         } = useForm({ defaultValues,
      resolver: yupResolver(schema)
   })
   const { fields, append, remove } = useFieldArray({
      control,
      name : "options"
   })
   
   const checkCategory = (val) => {
      const f = forms.find(form => form._source.items.category === val.value)
      if (f) {
         toast.error("این دسته بندی قبلا برای ساخت فرم انتخاب شده است")
      }
   }
   const checkSubCategory = (val) => {
      if (findSubCategory()?.find(c => c.value === watch().subCategory?.value)?.sub === undefined) {
         const f = forms.find(form => form._source.items.subCategory === val.value)
         if (f) {
            toast.error("این دسته بندی قبلا برای ساخت فرم انتخاب شده است")
         }
      }
     
     
   }
   const checkInnerCategory = (val) => {
      const f = forms.find(form => form._source.items.innerCategory === val.value)
      if (f) {
         toast.error("این دسته بندی قبلا برای ساخت فرم انتخاب شده است")
      }
   }
   
   const onSubmit = data => {
      setIsLoading(true)
      const {
               category, innerCategory, subCategory, title, description, image
               , activeMap, hideExactLocation, activeImage, max, options, activeVirtualTour,
               installment, deposit, exchange, consensualAd, activePrice
            } = data
      
      const newOptions = options.map(o => {
         const english = /^[A-Za-z0-9]*$/
         const camlCase = /^([a-z]+)(([A-Z]([a-z]+))+)$/
         // const snake = /[a-zA-Z]+(?:_[a-zA-Z]+)*/
         if (!english.test(o.name)) {
            toast.error("متن نام فیلد باید انگلیسی باشد")
            if (!camlCase.test(o.name)) {
               toast.error("متن نام فیلد باید camlCase باشد")
               
            }
         } else {
            const newName = o.name.replace(/\s/g, "")
            return {
               ...o,
               name : newName
            }
            
         }
         
      })
      
      axios.post(`/Ads/forms`, {
         ...(innerCategory !== null ? { cat_name : innerCategory.slug } : subCategory !== null && { cat_name : subCategory.slug }),
         items : {
            category : category.value,
            ...(subCategory && {
               subCategory : subCategory.value
            }),
            ...(innerCategory && {
               innerCategory : innerCategory.value
            }),
            form : {
               description : {
                  title,
                  ...(languages.length >= 1 && {
                     ...languages.reduce((acc, language) => {
                        acc[`title_${language}`] = data[`title_${language}`]
                        return acc
                     }, {})
                  }),
                  description,
                  ...(languages.length >= 1 && {
                     ...languages.reduce((acc, language) => {
                        acc[`description_${language}`] = data[`description_${language}`]
                        return acc
                     }, {})
                  }),
                  image,
                  ...(languages.length >= 1 && {
                     ...languages.reduce((acc, language) => {
                        acc[`image_${language}`] = data[`image_${language}`]
                        return acc
                     }, {})
                  })
               },
               setting     : {
                  installment,
deposit,
exchange,
consensualAd,
activePrice,
                  
                  virtualTour : {
                     active : activeVirtualTour
                  },
                  map         : {
                     active : activeMap,
                     hideExactLocation
                  },
                  image       : {
                     active : activeImage,
                     max    : Number(max)
                  }
               },
               options     : newOptions.map((option, index) => ({
                  title       : option.title,
                  ...(languages.length >= 1 && {
                     ...languages.reduce((acc, language) => {
                        acc[`title_${language}`] = newOptions[index][`title_${language}`]
                        return acc
                     }, {})
                  }),
                  type        : option.type.value,
                  name        : option.name,
                  required    : option.required,
                  description : option.description,
                  ...(languages.length >= 1 && {
                     ...languages.reduce((acc, language) => {
                        acc[`description_${language}`] = newOptions[index][`description_${language}`]
                        return acc
                     }, {})
                  }),
                  placeholder : option.placeholder,
                  ...(languages.length >= 1 && {
                     ...languages.reduce((acc, language) => {
                        acc[`placeholder_${language}`] = newOptions[index][`placeholder_${language}`]
                        return acc
                     }, {})
                  }),
                  activatedBy : option.activatedBy !== null &&
                  option.activatedBy.length >= 1 ? option.activatedBy.map(o => o.value) : null,
                  
                  ...(option.type.value === "text" && {
                     numeric   : option.numeric,
                     append    : option.append,
                     ...(languages.length >= 1 && {
                        ...languages.reduce((acc, language) => {
                           acc[`append_${language}`] = newOptions[index][`append_${language}`]
                           return acc
                        }, {})
                     }),
                     multiline : option.multiline
                  }),
                  ...(option.type.value === "select" && {
                     multiline : option.multilineSelect
                  }),
                  ...(option.type.value === "select" && option.nestedArray.length >= 1 && {
                     options : option.nestedArray.map((opt) => ({
                        label : opt.label,
                        ...(languages.length >= 1 && {
                           ...languages.reduce((acc, language) => {
                              acc[`label_${language}`] = option.nestedArray[index][`label_${language}`]
                              return acc
                           }, {})
                        }),
                        value : opt.value
                     }))
                  }),
                  ...(option.type.value === "limited_select" && {
                     multiline : option.multilineSelect
                  }),
                  ...(option.type.value === "limited_select" && option.nestedArray.length >= 1 && {
                     options : option.nestedArray.map((opt, i) => ({
                        label : opt.label,
                        ...(languages.length >= 1 && {
                           ...languages.reduce((acc, language) => {
                              acc[`label_${language}`] = option[index].nestedArray[i][`label_${language}`]
                              return acc
                           }, {})
                        }),
                        value : opt.value
                     }))
                  }),
                  ...(option.type.value === "range" && {
                     placeholder : option.placeholderRange,
                     ...(languages.length >= 1 && {
                        ...languages.reduce((acc, language) => {
                           acc[`placeholder_${language}`] = newOptions[index][`placeholder_${language}`]
                           return acc
                        }, {})
                     }),
                     title       : option.titleRange,
                     ...(languages.length >= 1 && {
                        ...languages.reduce((acc, language) => {
                           acc[`title_${language}`] = newOptions[index][`title_${language}`]
                           return acc
                        }, {})
                     }),
                     numeric     : option.numericRange
                  }),
                  ...(option.type.value === "range" && option.nestedArrayFrom.length >= 1 && {
                     from : option.nestedArrayFrom.map((opt, i) => ({
                        label : opt.label,
                        ...(languages.length >= 1 && {
                           ...languages.reduce((acc, language) => {
                              acc[`label_${language}`] = option[index].nestedArrayFrom[i][`label_${language}`]
   
                              return acc
                           }, {})
                        }),
                        value : opt.value
                     }))
                  }),
                  ...(option.type.value === "range" && option.nestedArrayTo.length >= 1 && {
                     to : option.nestedArrayTo.map((opt, i) => ({
                        label : opt.label,
                        ...(languages.length >= 1 && {
                           ...languages.reduce((acc, language) => {
                              acc[`label_${language}`] = option[index].nestedArrayTo[i][`label_${language}`]
   
                              return acc
                           }, {})
                        }),
                        value : opt.value
                     }))
                  })
               }))
            }
         }
      }).then(res => {
              if (res.status === 200) {
                 toast.success("با موفقیت عملیات انجام شد")
                 navigate("/forms/list")
              }
              
           }
      ).catch((e) => setIsLoading(false))
      
   }
   const findSubCategory = () => {
      const category = categoriesArray?.find(c => c._source.slug === watch().category?.value)?._source?.sub
      
      if (category && category.length >= 1) {
         return category.map(c => ({
            value : c.cat_name,
            slug  : c.slug,
            label : c.title,
            ...(c.sub && c.sub.length >= 1 && { sub : c.sub })
         }))
      }
      
   }
   const findInnerCategory = () => {
      const category = findSubCategory()?.find(c => c.value === watch().subCategory?.value)?.sub
      if (category.length >= 1) {
         return category.map(c => ({ value : c.cat_name, label : c.title, slug : c.slug }))
      }
      
   }
   
   return (
        <Fragment >
           <Card className = "invoice-preview-card" >
              <CardBody className = "invoice-padding pt-0" >
                 <Form className = "mt-2 pt-50" onSubmit = { handleSubmit(onSubmit) } >
   
                    <Row className = { "p-1 border-primary" }>
   
   
                    <Col sm = "6" className = "mb-1 " >
                          
                          <Label className = "form-label" >
                             انتخاب دسته بندی سطح اول </Label >
                          <span className = "text-danger" >*</span >
                          
                          <Controller
                               control = { control }
                               name = { `category` }
                               
                               render = { ({
                                               field : {
                                                  onChange,
                                                  value,
                                                  ref
                                               }
                                            }) => (
                                    <Select
                                         components = { {
                                            Option : OptionComponent
                                         } }
                                         inputRef = { ref }
                                         className = "react-select"
                                         classNamePrefix = "select"
                                         value = { value }
                                         onChange = { val => {
                                            onChange(val)
                                            setValue("subCategory", null)
                                            setValue("innerCategory", null)
                                         } }
                                         options = { categories }
                                         placeholder = "انتخاب دسته بندی سطح اول ها"
                                         noOptionsMessage = { () => "پیدا نشد" }
                                         loadingMessage = { () => "..." }   //minor type-O here
                                    />
                               ) }
                          />
                       </Col >
                       {
                            watch().category !== null && categories.length >= 1 &&
                            categoriesArray?.find(c => c._source.slug === watch().category?.value)?._source?.sub &&
                            <Col sm = "6" className = "mb-1" >
                               <Label
                                    className = "form-label" >
                                  انتخاب دسته بندی سطح دوم </Label >
                               <span className = "text-danger" >*</span >
                               
                               <Controller
                                    control = { control }
                                    // name="options"
                                    name = { `subCategory` }
                                    
                                    render = { ({
                                                    field : {
                                                       onChange,
                                                       value,
                                                       ref
                                                    }
                                                 }) => (
                                         <Select
                                              inputRef = { ref }
                                              className = "react-select"
                                              classNamePrefix = "select"
                                              value = { value }
                                              onChange = { val => {
                                                 onChange(val)
                                                 setValue("innerCategory", null)
                                                 checkSubCategory(val)
                                                 
                                              } }
                                              options = { findSubCategory() }
                                              placeholder = "انتخاب دسته بندی سطح دوم ها"
                                              noOptionsMessage = { () => "پیدا نشد" }
                                              loadingMessage = { () => "..." }   //minor type-O here
                                         />
                                    ) }
                               />
                            </Col >
                          
                       }
                       {
                            watch().subCategory !== null &&
                            findSubCategory()?.find(c => c.value === watch().subCategory?.value)?.sub &&
                            <Col sm = "6" className = "mb-1" >
                               <Label
                                    className = "form-label" >
                                  انتخاب دسته بندی سطح سوم </Label >
                               
                               <Controller
                                    control = { control }
                                    // name="options"
                                    name = { `innerCategory` }
                                    
                                    render = { ({
                                                    field : {
                                                       onChange,
                                                       value,
                                                       ref
                                                    }
                                                 }) => (
                                         <Select
                                              inputRef = { ref }
                                              className = "react-select"
                                              classNamePrefix = "select"
                                              value = { value }
                                              onChange = { val => {
onChange(val)
                                                 checkInnerCategory(val)
                                              } }
                                              options = { findInnerCategory() }
                                              placeholder = "انتخاب دسته بندی سطح سوم ها"
                                              noOptionsMessage = { () => "پیدا نشد" }
                                              loadingMessage = { () => "..." }   //minor type-O here
                                         />
                                    ) }
                               />
                            </Col >
                          
                       }
                    </Row>
                    <Row >
   
   
                    {
                            watch().category !== null && watch().subCategory !== null &&
                            <>
                               <hr className = "invoice-spacing" />
                               <Col sm = "6" className = "mb-1" >
                                  
                                  <Label className = "form-label" for = "title" >
                                     عنوان
                                     <span className = "text-danger" >*</span >
                                  
                                  </Label >
                                  <Controller
                                       name = "title"
                                       control = { control }
                                       render = { ({ field }) => (
                                            <Input id = "title" placeholder = " توضیحات فیلد عنوان ساخت آگهی"
                                                 invalid = { errors.title && true } { ...field } />
                                       ) }
                                  />
                               </Col >
                               {
                                  languages.map(language => {
                                     return    <Col sm = "6" className = "mb-1" >
                                        <Label className = "form-label" for = { `title_${language}` } >
                                           عنوان {language}
            
                                        </Label >
                                        <Controller
                                             name = { `title_${language}` }
                                             control = { control }
                                             render = { ({ field }) => (
                                                  <Input id = { `title_${language}` } placeholder = " توضیحات فیلد عنوان ساخت آگهی"
                                                       invalid={errors[`title_${language}`] && true} { ...field } />
                                             ) }
                                        />
                                        {errors[`title_${language}`] && (
                                             <FormFeedback>{errors[`title_${language}`].message}</FormFeedback>
                                        )}
                                     </Col >
                                  })
                               }

   
                               <Col sm = "6" className = "mb-1" >
                                  
                                  <Label className = "form-label" for = "description" >
                                     توضیحات توضیح آگهی
                                  
                                  </Label >
                                  <Controller
                                       name = "description"
                                       control = { control }
                                       render = { ({ field }) => (
                                            <Input id = "description"
                                                 placeholder = "توضیحات فیلد توضیحات ساخت آگهی"
                                                 type = { "textarea" }
                                                 
                                                 invalid = { errors.description && true } { ...field } />
                                       ) }
                                  />
                               </Col >
                               {
                                  languages.map(language => {
                                     return    <Col sm = "6" className = "mb-1" >
                                        <Label className = "form-label" for = { `description_${language}` } >
                                           توضیحات توضیح آگهی {language}
            
                                        </Label >
                                        <Controller
                                             name = { `description_${language}` }
                                             control = { control }
                                             render = { ({ field }) => (
                                                  <Input id = { `description_${language}` }
                                                       type = { "textarea" }
                                                       
                                                       placeholder = "توضیحات فیلد توضیحات ساخت آگهی"
                                                       invalid={errors[`description_${language}`] && true} { ...field } />
                                             ) }
                                        />
                                        {errors[`description_${language}`] && (
                                             <FormFeedback>{errors[`description_${language}`].message}</FormFeedback>
                                        )}
                                     </Col >
                                  })
                               }
                               
                               <Col sm = "6" className = "mb-1" >
                                  
                                  <Label className = "form-label" for = "image" >
                                     توضیحات عکس آگهی
                                  
                                  </Label >
                                  <Controller
                                       name = "image"
                                       control = { control }
                                       render = { ({ field }) => (
                                            <Input id = "image" placeholder = "توضیحات فیلد عکس ساخت آگهی"
                                                 type = { "textarea" }
                                                 invalid = { errors.image && true } { ...field } />
                                       ) }
                                  />
                               </Col >
                               {
                                  languages.map(language => {
                                     return    <Col sm = "6" className = "mb-1" >
                                        <Label className = "form-label" for = { `image_${language}` } >
                                           توضیحات عکس آگهی {language}
                               
            
                                        </Label >
                                        <Controller
                                             name = { `image_${language}` }
                                             control = { control }
                                             render = { ({ field }) => (
                                                  <Input id = { `image_${language}` }
                                                       type = { "textarea" }
                                                       
                                                       placeholder = "توضیحات فیلد عکس ساخت آگهی"
                                                       invalid={errors[`image_${language}`] && true} { ...field } />
                                             ) }
                                        />
                                        {errors[`image_${language}`] && (
                                             <FormFeedback>{errors[`image_${language}`].message}</FormFeedback>
                                        )}
                                     </Col >
                                  })
                               }
                               <hr className = "invoice-spacing" />
                               <Col sm = "3" className = "mb-1" >
                                  <div className = "mb-1 form-check form-check-inline" >
                                     <Controller
                                          name = "activeMap"
                                          control = { control }
                                          render = { ({
                                                          field, field : {
                                                value,
                                                ref
                                             }
                                             
                                                       }) => (
                                               <Input id = "activeMap"
                                                    type = "checkbox"
                                                    placeholder = "" invalid = { errors.activeMap && true }
                                                    checked = { value }
                                                    { ...field } />
                                          ) }
                                     />
                                     <Label for = "activeMap" className = "form-check-label" >
                                        نقشه نمایش داده شود؟
                                     </Label >
                                  </div >
                               </Col>
                               <Col sm = "3" className = "mb-1" >
                               
                                  <div className = "mb-1 form-check form-check-inline" >
                                     <Controller
                                          name = "hideExactLocation"
                                          control = { control }
                                          render = { ({
                                                          field, field : {
                                                value
                                             }
                                             
                                                       }) => (
                                               <Input id = "hideExactLocation"
                                                    type = "checkbox"
                                                    placeholder = ""
                                                    invalid = { errors.hideExactLocation && true }
                                                    checked = { value }
                                                    { ...field } />
                                          ) }
                                     />
                                     <Label for = "hideExactLocation" className = "form-check-label" >
                                        موقعیت مکانی دقیق نمایش داده شود؟
                                     </Label >
                                  </div >
                               </Col>
                               <Col sm = "3" className = "mb-1" >
                               
                                  <div className = "mb-1 form-check form-check-inline" >
                                     <Controller
                                          name = "exchange"
                                          control = { control }
                                          render = { ({
                                                          field, field : {
                                                value
                                             }
                                             
                                                       }) => (
                                               <Input id = "exchange"
                                                    type = "checkbox"
                                                    placeholder = ""
                                                    invalid = { errors.exchange && true }
                                                    checked = { value }
                                                    { ...field } />
                                          ) }
                                     />
                                     <Label for = "exchange" className = "form-check-label" >
                                        معاوضه فعال شود؟
                                     </Label >
                                  </div >
                               </Col>
                               <Col sm = "3" className = "mb-1" >
                               
                                  <div className = "mb-1 form-check form-check-inline" >
                                     <Controller
                                          name = "consensualAd"
                                          control = { control }
                                          render = { ({
                                                          field, field : {
                                                value
                                             }
                                             
                                                       }) => (
                                               <Input id = "consensualAd"
                                                    type = "checkbox"
                                                    placeholder = ""
                                                    invalid = { errors.consensualAd && true }
                                                    checked = { value }
                                                    { ...field } />
                                          ) }
                                     />
                                     <Label for = "consensualAd" className = "form-check-label" >
                                        آگهی توافقی فعال شود؟
                                     </Label >
                                  </div >
                               </Col>
                               <Col sm = "3" className = "mb-1" >
                               
                                  <div className = "mb-1 form-check form-check-inline" >
                                     <Controller
                                          name = "installment"
                                          control = { control }
                                          render = { ({
                                                          field, field : {
                                                value
                                             }
                                             
                                                       }) => (
                                               <Input id = "installment"
                                                    type = "checkbox"
                                                    placeholder = ""
                                                    invalid = { errors.installment && true }
                                                    checked = { value }
                                                    { ...field } />
                                          ) }
                                     />
                                     <Label for = "installment" className = "form-check-label" >
                                        خرید قسطی فعال شود؟
                                     </Label >
                                  </div >
                               </Col>
                               <Col sm = "3" className = "mb-1" >
                                  <div className = "mb-1 form-check form-check-inline" >
                                     <Controller
                                          name = "deposit"
                                          control = { control }
                                          render = { ({
                                                          field, field : {
                                                value
                                             }
                                             
                                                       }) => (
                                               <Input id = "deposit"
                                                    type = "checkbox"
                                                    placeholder = ""
                                                    invalid = { errors.deposit && true }
                                                    checked = { value }
                                                    { ...field } />
                                          ) }
                                     />
                                     <Label for = "deposit" className = "form-check-label" >
                                        ودیعه فعال شود؟
                                     </Label >
                                  </div >
                               </Col>
                               <Col sm = "3" className = "mb-1" >
                               
                                  <div className = "mb-1 form-check form-check-inline" >
                                     <Controller
                                          name = "activePrice"
                                          control = { control }
                                          render = { ({
                                                          field, field : {
                                                value
                                             }
                                             
                                                       }) => (
                                               <Input id = "activePrice"
                                                    type = "checkbox"
                                                    placeholder = ""
                                                    invalid = { errors.activePrice && true }
                                                    checked = { value }
                                                    { ...field } />
                                          ) }
                                     />
                                     <Label for = "activePrice" className = "form-check-label" >
                                        فیلد قیمت فعال شود؟
                                     </Label >
                                  </div >
                               
                               </Col >
                               <hr className = "invoice-spacing" />
                               <Col sm = "12" className = "mb-1" >
                                  <Label className = "form-label" for = "max" >
                                     حداکثر عکس
                                  </Label >
                                  <Controller
                                       name = "max"
                                       control = { control }
                                       render = { ({ field }) => (
                                            <Input id = "max" placeholder = " حداکثر تعداد انتخاب عکس"
                                                 type = { "number" }
                                                 
                                                 invalid = { errors.max && true } { ...field } />
                                       ) }
                                  />
                               </Col >
                               
                               <Col sm = "3" className = "mb-1" >
                                  <div className = "mb-1 form-check form-check-inline" >
                                     
                                     <Controller
                                          name = "activeImage"
                                          control = { control }
                                          render = { ({
                                                          field, field : {
                                                value,
                                                ref
                                             }
                                             
                                                       }) => (
                                               <Input id = "activeImage"
                                                    type = "checkbox"
                                                    placeholder = "" invalid = { errors.activeImage && true }
                                                    checked = { value }
                                                    { ...field } />
                                          ) }
                                     />
                                     <Label for = "activeImage" className = "form-check-label" >
                                        انتخاب عکس فعال شود؟
                                     </Label >
                                  </div >
                               </Col >
                               <Col sm = "3" className = "mb-1" >
                                  <div className = "mb-1 form-check form-check-inline" >
                                     
                                     <Controller
                                          name = "activeVirtualTour"
                                          control = { control }
                                          render = { ({
                                                          field, field : {
                                                value
                                             }
                                             
                                                       }) => (
                                               <Input id = "activeVirtualTour"
                                                    type = "checkbox"
                                                    placeholder = ""
                                                    invalid = { errors.activeVirtualTour && true }
                                                    checked = { value }
                                                    { ...field } />
                                          ) }
                                     />
                                     <Label for = "activeVirtualTour" className = "form-check-label" >
                                        فیلد تور مجازی فعال شود؟
                                     </Label >
                                  </div >
                               </Col >
                               
                               <hr className = "invoice-spacing" />
                               <Col className = "mb-1 " md = "12" sm = "12" >
                                  <p className = "h6" > آپشن ها</p >
                                  
                                  { fields.map((item, index) => (
                                       <Col sm = "12" className = "mb-1" key = { item.id } >
                                          <Row >
                                             
                                             <Col sm = "6" className = "mb-1" >
                                                <Label className = "form-label"
                                                     for = { `options.${ index }.title` } >
                                                   عنوان
                                                
                                                </Label >
                                                <Controller
                                                     control = { control }
                                                     
                                                     name = { `options.${ index }.title` }
                                                     render = { ({ field }) => (
                                                          <Input
                                                               id = { `options.${ index }.title` }
                                                               placeholder = "عنوان" { ...field }
                                                          
                                                          />
                                                     ) }
                                                />
                                             </Col >
                                             {
                                                languages.map(language => {
                                                   return    <Col sm = "6" className = "mb-1" >
                                                      <Label className = "form-label" for = { `options.${ index }.title_${language}` } >
                                                         عنوان {language}
                                                      </Label >
                                                      <Controller
                                                           name = { `options.${ index }.title_${language}` }
                                                           control = { control }
                                                           render = { ({ field }) => (
                                                                <Input id = { `options.${ index }.title_${language}` } placeholder = "عنوان"
                                                                     invalid = {errors.options && errors.options[index] && errors.options[index][`title_${language}`] && errors.options[index][`title_${language}`] && true } { ...field } />
                                                           ) }
                                                      />
                                                      {errors.options && errors.options[index] && errors.options[index][`title_${language}`] && (
                                                           <FormFeedback>{errors.options[index][`title_${language}`].message}</FormFeedback>
                                                      )}
                                                   </Col >
         
         
                                                })
                                             }
   
                                             <Col sm = "6" className = "mb-1" >
                                                <Label className = "form-label"
                                                     for = { `options.${ index }.name` } >
                                                   نام
                                                   <span className = "text-danger" >*</span >
                                                
                                                </Label >
                                                <Controller
                                                     control = { control }
                                                     
                                                     name = { `options.${ index }.name` }
                                                     render = { ({ field }) => (
                                                          <Input
                                                               id = { `options.${ index }.name` }
                                                               placeholder = "نام باید انگلیسی باشد و به صورت camlCase" { ...field }
                                                          
                                                          />
                                                     ) }
                                                />
                                             </Col >
                                             <Col className = "mb-1" md = "6"
                                                  sm = "12" >
                                                <Label
                                                     className = "form-label" >
                                                   نوع فیلد </Label >
                                                
                                                <Controller
                                                     control = { control }
                                                     // name="options"
                                                     name = { `options.${ index }.type` }
                                                     
                                                     render = { ({
                                                                     field : {
                                                                        onChange,
                                                                        value,
                                                                        ref
                                                                     }
                                                                  }) => (
                                                          <Select
                                                               inputRef = { ref }
                                                               className = "react-select"
                                                               classNamePrefix = "select"
                                                               value = { value }
                                                               onChange = { val => onChange(val) }
                                                               options = { typeOptions }
                                                               placeholder = "نوع فیلد ها"
                                                               noOptionsMessage = { () => "پیدا نشد" }
                                                               loadingMessage = { () => "..." }   //minor
                                                               // type-O
                                                               // here
                                                          />
                                                     ) }
                                                />
                                             </Col >
                                             <Col className = "mb-1" md = "6"
                                                  sm = "12" >
                                                <Label
                                                     className = "form-label" >
                                                   فعال کردن با </Label >
                                                
                                                <Controller
                                                     control = { control }
                                                     // name="options"
                                                     name = { `options.${ index }.activatedBy` }
                                                     
                                                     render = { ({
                                                                     field : {
                                                                        onChange,
                                                                        value,
                                                                        ref
                                                                     }
                                                                  }) => (
                                                          <Select
                                                               inputRef = { ref }
                                                               className = "react-select"
                                                               classNamePrefix = "select"
                                                               value = { value }
                                                               isMulti
                                                               onChange = { val => onChange(val) }
                                                               options = { watch().options.length > 0 &&
                                                                    watch().options.filter(o => (o.name !== watch().options[index].name)
                                                                    ).map(o => ({
                                                                       label : o.name,
                                                                       value : o.name
                                                                    })) }
                                                               placeholder = "فعال کردن با"
                                                               noOptionsMessage = { () => "پیدا نشد" }
                                                               loadingMessage = { () => "..." }   //minor
                                                               // type-O
                                                               // here
                                                          />
                                                     ) }
                                                />
                                             </Col >
                                             
                                             <Col sm = "6" className = "mb-1" >
                                                <Label className = "form-label"
                                                     for = { `options.${ index }.placeholder` } >
                                                   متن placeholder
                                                
                                                </Label >
                                                <Controller
                                                     control = { control }
                                                     
                                                     name = { `options.${ index }.placeholder` }
                                                     render = { ({ field }) => (
                                                          <Input
                                                               id = { `options.${ index }.placeholder` }
                                                               placeholder = "متن placeholder" { ...field }
                                                          
                                                          />
                                                     ) }
                                                />
                                             </Col >
   
                                             {
                                                languages.map(language => {
                                                   return    <Col sm = "6" className = "mb-1" >
                                                      <Label className = "form-label" for = { `options.${ index }.placeholder_${language}` } >
                                                         متن placeholder {language}
                                       
            
                                                      </Label >
                                                      <Controller
                                                           name = { `options.${ index }.placeholder_${language}` }
                                                           control = { control }
                                                           render = { ({ field }) => (
                                                                <Input id = { `options.${ index }.placeholder_${language}` } placeholder = "متن placeholder"
                                                                     invalid = { errors.options && errors.options[index] && errors.options[index][`placeholder_${language}`] && true } { ...field } />
                                                           ) }
                                                      />
                                                      {errors.options && errors.options[index] && errors.options[index][`placeholder_${language}`] && (
                                                           <FormFeedback>{errors.options[index][`placeholder_${language}`].message}</FormFeedback>
                                                      )}
                                                   </Col >
         
         
                                                })
                                             }
                                             <Col sm = "12" className = "mb-1" >
                                                <Label className = "form-label"
                                                     for = { `options.${ index }.description` } >
                                                   توضیحات
                                                
                                                </Label >
                                                <Controller
                                                     control = { control }
                                                     
                                                     name = { `options.${ index }.description` }
                                                     render = { ({ field }) => (
                                                          <Input
                                                               id = { `options.${ index }.description` }
                                                               type = { "textarea" }
                                                               placeholder = "توضیحات" { ...field }
                                                          
                                                          />
                                                     ) }
                                                />
                                             </Col >
                                             {
                                                languages.map(language => {
                                                   return    <Col sm = "6" className = "mb-1" >
                                                      <Label className = "form-label" for = { `options.${ index }.description_${language}` } >
                                                         توضیحات {language}
            
            
                                                      </Label >
                                                      <Controller
                                                           name = { `options.${ index }.description_${language}` }
                                                           control = { control }
                                                           render = { ({ field }) => (
                                                                <Input id = { `options.${ index }.description_${language}` } description = "توضیحات"
                                                                     type = { "textarea" }
                                                                     invalid = { errors.options && errors.options[index] && errors.options[index][`description_${language}`] && true } { ...field } />
                                                           ) }
                                                      />
                                                      {errors.options && errors.options[index] && errors.options[index][`description_${language}`] && (
                                                           <FormFeedback>{errors.options[index][`description_${language}`].message}</FormFeedback>
                                                      )}
                                                   </Col >
         
         
                                                })
                                             }
                                             <Col md = "12"
                                                  className = "mb-1" >
                                                <div className = "mb-1 form-check form-check-inline" >
                                                   <Controller
                                                        name = { `options.${ index }.required` }
                                                        control = { control }
                                                        
                                                        render = { ({
                                                                        field, field : {
                                                              value,
                                                              ref
                                                           }
                                                                     }) => (
                                                             <Input
                                                                  { ...register(`options.${ index }.required`) }
                                                                  type = "checkbox"
                                                                  checked = { value }
                                                                  placeholder = "" { ...field } />
                                                        ) }
                                                   />
                                                   <Label
                                                        for = { `options.${ index }.required` }
                                                        
                                                        className = "form-check-label" >
                                                      فیلد ضروری است ؟
                                                   </Label >
                                                </div >
                                             </Col >
                                             <Alert color = "primary" >
                                                <h4 className = "alert-heading" >&darr; فیلدهای مطابق بر نوع
                                                   فیلد انتخاب شده</h4 >
                                             </Alert >
                                             {
                                                watch().options[index].type !== null &&
                                                watch().options[index].type.value === "text" ? <>
                                                   <Col md = "6"
                                                        className = "mb-1" >
                                                      <div className = "mb-1 form-check form-check-inline" >
                                                         <Controller
                                                              name = { `options.${ index }.numeric` }
                                                              control = { control }
                                                              
                                                              render = { ({
                                                                              field, field : { value }
                                                                           }) => (
                                                                   <Input
                                                                        { ...register(`options.${ index }.numeric`) }
                                                                        type = "checkbox"
                                                                        checked = { value }
                                                                        placeholder = "" { ...field } />
                                                              ) }
                                                         />
                                                         <Label
                                                              for = { `options.${ index }.numeric` }
                                                              
                                                              className = "form-check-label" >
                                                            فیلد عددی است ؟
                                                         </Label >
                                                      </div >
                                                   </Col >
                                                   <Col md = "6"
                                                        className = "mb-1" >
                                                      <div className = "mb-1 form-check form-check-inline" >
                                                         <Controller
                                                              name = { `options.${ index }.multiline` }
                                                              control = { control }
                                                              
                                                              render = { ({
                                                                              field, field : { value }
                                                                           }) => (
                                                                   <Input
                                                                        { ...register(`options.${ index }.multiline`) }
                                                                        type = "checkbox"
                                                                        checked = { value }
                                                                        placeholder = "" { ...field } />
                                                              ) }
                                                         />
                                                         <Label
                                                              for = { `options.${ index }.multiline` }
                                                              
                                                              className = "form-check-label" >
                                                            فیلد چند خطی است ؟
                                                         </Label >
                                                      </div >
                                                   </Col >
                                                   
                                                   <Col sm = "12" className = "mb-1" >
                                                      <Label className = "form-label"
                                                           for = { `options.${ index }.append` } >
                                                         متن انتهای فیلد
                                                      
                                                      </Label >
                                                      <Controller
                                                           control = { control }
                                                           
                                                           name = { `options.${ index }.append` }
                                                           render = { ({ field }) => (
                                                                <Input
                                                                     id = { `options.${ index }.append` }
                                                                     placeholder = " متن کوتاه در انتهای فیلد" { ...field }
                                                                
                                                                />
                                                           ) }
                                                      />
                                                   </Col >
                                                   {
                                                      languages.map(language => {
                                                         return    <Col sm = "6" className = "mb-1" >
                                                            <Label className = "form-label" for = { `options.${ index }.append_${language}` } >
                                                               متن انتهای فیلد {language}
            
            
                                                            </Label >
                                                            <Controller
                                                                 name = { `options.${ index }.append_${language}` }
                                                                 control = { control }
                                                                 render = { ({ field }) => (
                                                                      <Input id = { `options.${ index }.append_${language}` } placeholder = "متن انتهای فیلد"
                                                                           invalid = { errors.options && errors.options[index] && errors.options[index][`append_${language}`] && true } { ...field } />
                                                                 ) }
                                                            />
                                                            {errors.options && errors.options[index] && errors.options[index][`append_${language}`] && (
                                                                 <FormFeedback>{errors.options[index][`append_${language}`].message}</FormFeedback>
                                                            )}
                                                         </Col >
         
         
                                                      })
                                                   }
                                                   
                                                </> : watch().options[index].type !== null &&
                                                watch().options[index].type.value === "select" ? <>
                                                   <Col md = "12"
                                                        className = "mb-1" >
                                                      <div className = "mb-1 form-check form-check-inline" >
                                                         <Controller
                                                              name = { `options.${ index }.multilineSelect` }
                                                              control = { control }
                                                              
                                                              render = { ({
                                                                              field, field : { value }
                                                                           }) => (
                                                                   <Input
                                                                        { ...register(`options.${ index }.multilineSelect`) }
                                                                        type = "checkbox"
                                                                        checked = { value }
                                                                        placeholder = "" { ...field } />
                                                              ) }
                                                         />
                                                         <Label
                                                              for = { `options.${ index }.multilineSelect` }
                                                              
                                                              className = "form-check-label" >
                                                            فیلد چند آیتمی است ؟
                                                         </Label >
                                                      </div >
                                                   </Col >
                                                   
                                                   <OptionsFieldSelect index = { index }
                                                        control = { control } errors={errors}/>
                                                
                                                </> : watch().options[index].type !== null &&
                                                watch().options[index].type.value === "limited_select" ? <>
                                                   <Col md = "12"
                                                        className = "mb-1" >
                                                      <div className = "mb-1 form-check form-check-inline" >
                                                         <Controller
                                                              name = { `options.${ index }.multilineSelect` }
                                                              control = { control }
                                                              
                                                              render = { ({
                                                                              field, field : { value }
                                                                           }) => (
                                                                   <Input
                                                                        { ...register(`options.${ index }.multilineSelect`) }
                                                                        type = "checkbox"
                                                                        checked = { value }
                                                                        placeholder = "" { ...field } />
                                                              ) }
                                                         />
                                                         <Label
                                                              for = { `options.${ index }.multilineSelect` }
                                                              
                                                              className = "form-check-label" >
                                                            فیلد چند آیتمی است ؟
                                                         </Label >
                                                      </div >
                                                   </Col >
                                                   
                                                   <OptionsFieldSelect index = { index }
                                                        control = { control } />
                                                
                                                </> : watch().options[index].type !== null &&
                                                     watch().options[index].type.value === "range" &&
                                                     <>
                                                        
                                                        <Col sm = "6" className = "mb-1" >
                                                           <Label className = "form-label"
                                                                for = { `options.${ index }.titleRange` } >
                                                              عنوان
                                                           
                                                           </Label >
                                                           <Controller
                                                                control = { control }
                                                                
                                                                name = { `options.${ index }.titleRange` }
                                                                render = { ({ field }) => (
                                                                     <Input
                                                                          id = { `options.${ index }.titleRange` }
                                                                          placeholder = "عنوان" { ...field }
                                                                     
                                                                     />
                                                                ) }
                                                           />
                                                        </Col >
                                                        {
                                                           languages.map(language => {
                                                              return    <Col sm = "6" className = "mb-1" >
                                                                 <Label className = "form-label" for = { `options.${ index }.titleRange_${language}` } >
                                                                    عنوان {language}
                                                                 </Label >
                                                                 <Controller
                                                                      name = { `options.${ index }.titleRange_${language}` }
                                                                      control = { control }
                                                                      render = { ({ field }) => (
                                                                           <Input id = { `options.${ index }.titleRange_${language}` } placeholder = "عنوان"
                                                                                invalid = {errors.options && errors.options[index] && errors.options[index][`titleRange_${language}`] && errors.options[index][`titleRange_${language}`] && true } { ...field } />
                                                                      ) }
                                                                 />
                                                                 {errors.options && errors.options[index] && errors.options[index][`titleRange_${language}`] && (
                                                                      <FormFeedback>{errors.options[index][`titleRange_${language}`].message}</FormFeedback>
                                                                 )}
                                                              </Col >
         
         
                                                           })
                                                        }
   
                                                        <Col sm = "6" className = "mb-1" >
                                                           <Label className = "form-label"
                                                                for = { `options.${ index }.placeholderRange` } >
                                                              متن placeholder
                                                           
                                                           </Label >
                                                           <Controller
                                                                control = { control }
                                                                
                                                                name = { `options.${ index }.placeholderRange` }
                                                                render = { ({ field }) => (
                                                                     <Input
                                                                          id = { `options.${ index }.placeholderRange` }
                                                                          placeholder = "متن placeholder" { ...field }
                                                                     
                                                                     />
                                                                ) }
                                                           />
                                                        </Col >
                                                        {
                                                           languages.map(language => {
                                                              return    <Col sm = "6" className = "mb-1" >
                                                                 <Label className = "form-label" for = { `options.${ index }.placeholderRange_${language}` } >
                                                                    متن placeholderRange {language}
            
            
                                                                 </Label >
                                                                 <Controller
                                                                      name = { `options.${ index }.placeholderRange_${language}` }
                                                                      control = { control }
                                                                      render = { ({ field }) => (
                                                                           <Input id = { `options.${ index }.placeholderRange_${language}` } placeholderRange = "متن placeholderRange"
                                                                                invalid = { errors.options && errors.options[index] && errors.options[index][`placeholderRange_${language}`] && true } { ...field } />
                                                                      ) }
                                                                 />
                                                                 {errors.options && errors.options[index] && errors.options[index][`placeholderRange_${language}`] && (
                                                                      <FormFeedback>{errors.options[index][`placeholderRange_${language}`].message}</FormFeedback>
                                                                 )}
                                                              </Col >
         
         
                                                           })
                                                        }
   
                                                        <Col md = "12"
                                                             className = "mb-1" >
                                                           <div className = "mb-1 form-check form-check-inline" >
                                                              <Controller
                                                                   name = { `options.${ index }.numericRange` }
                                                                   control = { control }
                                                                   
                                                                   render = { ({
                                                                                   field, field : { value }
                                                                                }) => (
                                                                        <Input
                                                                             { ...register(`options.${ index }.numericRange`) }
                                                                             type = "checkbox"
                                                                             checked = { value }
                                                                             placeholder = "" { ...field } />
                                                                   ) }
                                                              />
                                                              <Label
                                                                   for = { `options.${ index }.numericRange` }
                                                                   className = "form-check-label" >
                                                                 فیلد عددی است ؟
                                                              </Label >
                                                           </div >
                                                        </Col >
                                                        
                                                        <OptionsFieldFrom index = { index }
                                                             control = { control } errors={errors}/>
                                                        <OptionsFieldTo index = { index }
                                                             control = { control } errors={errors}/>
                                                     
                                                     </>
                                                
                                             }
                                          </Row >
                                          <Button className = "me-1" color = "primary" outline
                                               type = "button"
                                               onClick = { () => remove(index) } > حذف
                                          </Button >
                                       
                                       </Col >
                                  )) }
                                  <Button
                                       type = "button"
                                       onClick = { () => append({
                                          title       : "",
                                          name        : "",
                                          append : "",
                                          placeholder : "",
                                          description : "",
                                          required    : false,
                                          type        : null,
                                          activatedBy : null
                                          
                                       }) }
                                       className = "me-1" color = "primary" >
                                     افزودن آپشن جدید
                                  </Button >
                               </Col >
                            
                            </>
                       }
                       
                       <Col className = "mt-2" sm = "12" >
                          <Button type = "submit" className = "me-1" color = "primary" >
                             { isLoading ? "در حال بارگذاری" : "ذخیره تغییرات" }
                          
                          </Button >
                          <Button onClick={() => navigate(-1)} type = "reset" color = "secondary" outline >
                             لغو
                          </Button >
                       </Col >
                    </Row >
                 </Form >
              
              </CardBody >
           
           </Card >
        
        </Fragment >
   )
}

export default AddCard

const OptionsFieldSelect = ({ index, control, errors }) => {
   const { languages } = useSelector(state => state.navbar)
   
   const { fields : innerFields, append : innerAppend, remove : innerRemove } = useFieldArray({
      control,
      name : `options[${ index }].nestedArray`
   })
   
   return (
        <Fragment >
           <Card className = "invoice-preview-card" >
              <CardBody className = "invoice-padding pt-0" >
                 <Form className = "mt-2 p-0" >
                    
                    <Row >
                       
                       <Col className = "mb-1 " md = "12" sm = "12" >
                          <Row className = { "mt-1 bg-light-secondary" } >
                             <Col className = "my-1" md = "12" sm = "12" >
                                <p className = "h6" > آپشن فیلد سلکت({ index + 1 }) </p >
                                
                                { innerFields.map((item, innerIndex) => (
                                     <Col sm = "12" className = "mb-1"
                                          key = { item.id } >
                                        <Row >
                                           
                                           <Col sm = "6" className = "mb-1" >
                                              <Label
                                                   className = "form-label"
                                                   for = { `options[${ index }].nestedArray[${ innerIndex }].label` }
                                              
                                              >
                                                 برچسب(label)
                                                 <span
                                                      className = "text-danger" >*</span >
                                              
                                              </Label >
                                              <Controller
                                                   control = { control }
                                                   name = { `options[${ index }].nestedArray[${ innerIndex }].label` }
                                                   render = { ({ field }) => (
                                                        <Input
                                                             id = { `options[${ index }].nestedArray[${ innerIndex }].label` }
                                                             placeholder = "برچسب" { ...field }
                                                        
                                                        />
                                                   ) }
                                              />
                                           </Col >
                                           {
                                              languages.map(language => {
                                                 return    <Col sm = "6" className = "mb-1" >
                                                    <Label className = "form-label" for = { `options[${ index }].nestedArray[${ innerIndex }].label_${language}`  } >
                                                       برچسب {language}
            
            
                                                    </Label >
                                                    <Controller
                                                         name = {`options[${ index }].nestedArray[${ innerIndex }].label_${language}` }
                                                         control = { control }
                                                         render = { ({ field }) => (
                                                              <Input id = {`options[${ index }].nestedArray[${ innerIndex }].label_${language}` } placeholder = "برچسب"
                                                                   invalid = {errors.options &&  errors.options[index].nestedArray[innerIndex][`label_${language}`] && true } { ...field } />
                                                         ) }
                                                    />
                                                    {errors.options && errors.options?.[index]?.nestedArray?.[innerIndex]?.[`label_${language}`] && (
                                                         <FormFeedback>
                                                            {errors.options[index].nestedArray[innerIndex][`label_${language}`].message}
                                                         </FormFeedback>
                                                    )}
                                                 </Col >
         
         
                                              })
                                           }
   
                                           <Col sm = "6" className = "mb-1" >
                                              <Label
                                                   className = "form-label"
                                                   for = { `options[${ index }].nestedArray[${ innerIndex }].value` }
                                              
                                              >
                                                 مقدار(value)
                                                 <span
                                                      className = "text-danger" >*</span >
                                              
                                              </Label >
                                              <Controller
                                                   control = { control }
                                                   name = { `options[${ index }].nestedArray[${ innerIndex }].value` }
                                                   render = { ({ field }) => (
                                                        <Input
                                                             id = { `options[${ index }].nestedArray[${ innerIndex }].value` }
                                                             placeholder = "مقدار باید مانند نام فیلد انگلیسی باشد و به صورت camlCase" { ...field }
                                                        
                                                        />
                                                   ) }
                                              />
                                           </Col >
                                        
                                        </Row >
                                        <Button className = "me-1"
                                             color = "primary" outline
                                             type = "button"
                                             onClick = { () => innerRemove(innerIndex) } >حذف
                                           آپشن</Button >
                                     
                                     </Col >
                                )) }
                                <Button
                                     type = "button"
                                     onClick = { () => innerAppend({
                                        label : "",
                                        value : ""
                                     }) }
                                     className = "me-1" color = "primary" >
                                   افزودن آپشن
                                </Button >
                             </Col >
                          
                          </Row >
                       
                       </Col >
                    
                    </Row >
                 </Form >
              
              </CardBody >
           
           </Card >
        
        </Fragment >
   )
}

const OptionsFieldFrom = ({ index, control, errors }) => {
   const { languages } = useSelector(state => state.navbar)
   
   const { fields : innerFields, append : innerAppend, remove : innerRemove } = useFieldArray({
      control,
      name : `options[${ index }].nestedArrayFrom`
   })
   
   return (
        <Fragment >
           <Card className = "invoice-preview-card" >
              <CardBody className = "invoice-padding pt-0" >
                 <Form className = "mt-2 p-0" >
                    
                    <Row >
                       
                       <Col className = "mb-1 " md = "12" sm = "12" >
                          <Row className = { "mt-1 bg-light-secondary" } >
                             <Col className = "my-1" md = "12" sm = "12" >
                                <p className = "h6" > آپشن فیلد بازه از -({ index + 1 } )</p >
                                
                                { innerFields.map((item, innerIndex) => (
                                     <Col sm = "12" className = "mb-1"
                                          key = { item.id } >
                                        <Row >
                                           
                                           <Col sm = "6" className = "mb-1" >
                                              <Label
                                                   className = "form-label"
                                                   for = { `options[${ index }].nestedArrayFrom[${ innerIndex }].label` }
                                              
                                              >
                                                 برچسب(label)
                                                 <span
                                                      className = "text-danger" >*</span >
                                              
                                              </Label >
                                              <Controller
                                                   control = { control }
                                                   name = { `options[${ index }].nestedArrayFrom[${ innerIndex }].label` }
                                                   render = { ({ field }) => (
                                                        <Input
                                                             id = { `options[${ index }].nestedArrayFrom[${ innerIndex }].label` }
                                                             placeholder = "برچسب" { ...field }
                                                        
                                                        />
                                                   ) }
                                              />
                                           </Col >
                                           {
                                              languages.map(language => {
                                                 return    <Col sm = "6" className = "mb-1" >
                                                    <Label className = "form-label" for = { `options[${ index }].nestedArrayFrom[${ innerIndex }].label_${language}`  } >
                                                       برچسب {language}
            
            
                                                    </Label >
                                                    <Controller
                                                         name = {`options[${ index }].nestedArrayFrom[${ innerIndex }].label_${language}` }
                                                         control = { control }
                                                         render = { ({ field }) => (
                                                              <Input id = {`options[${ index }].nestedArrayFrom[${ innerIndex }].label_${language}` } placeholder = "برچسب"
                                                                   invalid = {errors.options &&  errors.options[index].nestedArrayFrom[innerIndex][`label_${language}`] && true } { ...field } />
                                                         ) }
                                                    />
                                                    {errors.options && errors.options?.[index]?.nestedArrayFrom?.[innerIndex]?.[`label_${language}`] && (
                                                         <FormFeedback>
                                                            {errors.options[index].nestedArrayFrom[innerIndex][`label_${language}`].message}
                                                         </FormFeedback>
                                                    )}
                                                 </Col >
         
         
                                              })
                                           }
   
                                           <Col sm = "6" className = "mb-1" >
                                              <Label
                                                   className = "form-label"
                                                   for = { `options[${ index }].nestedArrayFrom[${ innerIndex }].value` }
                                              
                                              >
                                                 مقدار(value)
                                                 <span
                                                      className = "text-danger" >*</span >
                                              
                                              </Label >
                                              <Controller
                                                   control = { control }
                                                   name = { `options[${ index }].nestedArrayFrom[${ innerIndex }].value` }
                                                   render = { ({ field }) => (
                                                        <Input
                                                             id = { `options[${ index }].nestedArray[${ innerIndex }].value` }
                                                             placeholder = "مقدار باید مانند نام فیلد انگلیسی باشد و به صورت camlCase" { ...field }
                                                        
                                                        />
                                                   ) }
                                              />
                                           </Col >
                                        
                                        </Row >
                                        <Button className = "me-1"
                                             color = "primary" outline
                                             type = "button"
                                             onClick = { () => innerRemove(innerIndex) } >حذف
                                           آپشن</Button >
                                     
                                     </Col >
                                )) }
                                <Button
                                     type = "button"
                                     onClick = { () => innerAppend({
                                        label : "",
                                        value : ""
                                     }) }
                                     className = "me-1" color = "primary" >
                                   افزودن آپشن
                                </Button >
                             </Col >
                          
                          </Row >
                       
                       </Col >
                    
                    </Row >
                 </Form >
              
              </CardBody >
           
           </Card >
        
        </Fragment >
   )
}
const OptionsFieldTo = ({ index, control, errors }) => {
   const { languages } = useSelector(state => state.navbar)
   
   const { fields : innerFields, append : innerAppend, remove : innerRemove } = useFieldArray({
      control,
      name : `options[${ index }].nestedArrayTo`
   })
   
   return (
        <Fragment >
           <Card className = "invoice-preview-card" >
              <CardBody className = "invoice-padding pt-0" >
                 <Form className = "mt-2 p-0" >
                    
                    <Row >
                       
                       <Col className = "mb-1 " md = "12" sm = "12" >
                          <Row className = { "mt-1 bg-light-secondary" } >
                             <Col className = "my-1" md = "12" sm = "12" >
                                <p className = "h6" > آپشن فیلد بازه به -({ index + 1 }) </p >
                                
                                { innerFields.map((item, innerIndex) => (
                                     <Col sm = "12" className = "mb-1"
                                          key = { item.id } >
                                        <Row >
                                           
                                           <Col sm = "6" className = "mb-1" >
                                              <Label
                                                   className = "form-label"
                                                   for = { `options[${ index }].nestedArrayTo[${ innerIndex }].label` }
                                              
                                              >
                                                 برچسب(label)
                                                 <span
                                                      className = "text-danger" >*</span >
                                              
                                              </Label >
                                              <Controller
                                                   control = { control }
                                                   name = { `options[${ index }].nestedArrayTo[${ innerIndex }].label` }
                                                   render = { ({ field }) => (
                                                        <Input
                                                             id = { `options[${ index }].nestedArrayTo[${ innerIndex }].label` }
                                                             placeholder = "برچسب" { ...field }
                                                        
                                                        />
                                                   ) }
                                              />
                                           </Col >
                                           {
                                              languages.map(language => {
                                                 return    <Col sm = "6" className = "mb-1" >
                                                    <Label className = "form-label" for = { `options[${ index }].nestedArrayTo[${ innerIndex }].label_${language}`  } >
                                                       برچسب {language}
            
            
                                                    </Label >
                                                    <Controller
                                                         name = {`options[${ index }].nestedArrayTo[${ innerIndex }].label_${language}` }
                                                         control = { control }
                                                         render = { ({ field }) => (
                                                              <Input id = {`options[${ index }].nestedArrayTo[${ innerIndex }].label_${language}` } placeholder = "برچسب"
                                                                   invalid = {errors.options &&  errors.options[index].nestedArrayTo[innerIndex][`label_${language}`] && true } { ...field } />
                                                         ) }
                                                    />
                                                    {errors.options && errors.options?.[index]?.nestedArrayTo?.[innerIndex]?.[`label_${language}`] && (
                                                         <FormFeedback>
                                                            {errors.options[index].nestedArrayTo[innerIndex][`label_${language}`].message}
                                                         </FormFeedback>
                                                    )}
                                                 </Col >
         
         
                                              })
                                           }
   
                                           <Col sm = "6" className = "mb-1" >
                                              <Label
                                                   className = "form-label"
                                                   for = { `options[${ index }].nestedArrayTo[${ innerIndex }].value` }
                                              
                                              >
                                                 مقدار(value)
                                                 <span
                                                      className = "text-danger" >*</span >
                                              
                                              </Label >
                                              <Controller
                                                   control = { control }
                                                   name = { `options[${ index }].nestedArrayTo[${ innerIndex }].value` }
                                                   render = { ({ field }) => (
                                                        <Input
                                                             id = { `options[${ index }].nestedArray[${ innerIndex }].value` }
                                                             placeholder = "مقدار باید مانند نام فیلد انگلیسی باشد و به صورت camlCase" { ...field }
                                                        
                                                        />
                                                   ) }
                                              />
                                           </Col >
                                        
                                        </Row >
                                        <Button className = "me-1"
                                             color = "primary" outline
                                             type = "button"
                                             onClick = { () => innerRemove(innerIndex) } >حذف
                                           آپشن</Button >
                                     
                                     </Col >
                                )) }
                                <Button
                                     type = "button"
                                     onClick = { () => innerAppend({
                                        label : "",
                                        value : ""
                                     }) }
                                     className = "me-1" color = "primary" >
                                   افزودن آپشن
                                </Button >
                             </Col >
                          
                          </Row >
                       
                       </Col >
                    
                    </Row >
                 </Form >
              
              </CardBody >
           
           </Card >
        
        </Fragment >
   )
}
