// ** React Imports
import {Fragment, useState} from "react"

// ** Reactstrap Imports
import {Button, Card, CardBody, CardHeader, CardTitle, ListGroup, ListGroupItem} from "reactstrap"

// ** Third Party Imports
import {useDropzone} from "react-dropzone"
import {DownloadCloud, FileText, X} from "react-feather"

const FileUploaderSingle = ({title, accept, uploadFile, format, link, index}) => {
    // ** State
    const [files, setFiles] = useState(link ? [link] : [])


    const {getRootProps, getInputProps} = useDropzone({
        multiple: false,
        accept,
        onDrop: acceptedFiles => {
            setFiles([...acceptedFiles.map(file => Object.assign(file))])
            uploadFile([...acceptedFiles.map(file => Object.assign(file))])
            // setCurrentImage({ index, field })

        }
    })

    const renderFilePreview = (file) => {
        if (file.type && file.type.startsWith('image')) {
            return <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28'/>
        } else if (!file.type) {
            if (file.includes("jpg") || file.includes("png") || file.includes("jpeg")) {
                return <img className='rounded' alt={"file"} src={file} height='28' width='28'/>

            } else {
                return <FileText size='28'/>

            }
        } else {
            return <FileText size='28'/>
        }
    }

    const handleRemoveFile = file => {
        const uploadedFiles = files
        const filtered = uploadedFiles.filter(i => i.name !== file.name)
        setFiles([...filtered])
        uploadFile("delete")

    }


    const renderFileSize = size => {
        if (Math.round(size / 100) / 10 > 1000) {
            return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
        } else {
            return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
        }
    }

    const fileList = files.map((file, index) => (
        <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
            <div className='file-details d-flex align-items-center'>
                <div className='file-preview me-1'>{renderFilePreview(file)}</div>
                <div>
                    {
                        file.name ? <>
                            <p className='file-name mb-0'>{file.name}</p>
                            <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
                        </> : <p className='file-name mb-0'>{
                            <a className='file-name mb-0' href={link}>{link?.slice(0, 20)}</a>
                        }</p>
                    }

                </div>
            </div>
            <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
                <X size={14}/>
            </Button>
        </ListGroupItem>
    ))


    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4'>{title}</CardTitle>
            </CardHeader>
            <CardBody>
                <div {...getRootProps({className: 'dropzone'})}>
                    <input {...getInputProps()} />
                    <div className='d-flex align-items-center justify-content-center flex-column'>
                        <DownloadCloud size={64}/>
                        <h5>فایل {format} را درگ کرده یا کلیک کنید</h5>
                        <p className='text-secondary'>
                            فایل را درگ کرده یا بر روی {' '}
                            <a href='/' onClick={e => e.preventDefault()}>
                                جست و جو
                            </a>{' '}
                            کلیک کرده و در سیستم خود بگردید
                        </p>
                    </div>
                </div>

                <Fragment>
                    <ListGroup className='my-2'>{fileList}</ListGroup>
                    <div className='d-flex justify-content-end'>
                        {/*<Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>*/}
                        {/* حذف فایل*/}
                        {/*</Button>*/}
                        {/*<Button color='primary'>آپلود فایل </Button>*/}
                    </div>
                </Fragment>

            </CardBody>
        </Card>
    )
}

export default FileUploaderSingle
