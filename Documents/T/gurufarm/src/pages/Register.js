import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Nav from '../pages/components/Nav';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Row,
    Container,
    Toast,
    ToastBody,
    ToastHeader,
    CustomInput,
    FormFeedback,
    FormText
} from 'reactstrap';
import AddressData from './components/AddressData';
import { api } from '../config';
import Swal from 'sweetalert2';
import liffHelper from '../utils/liffHelper';
import messageHelper from '../utils/messagingApiHelper';
import Moment from 'react-moment';
import vConsole from '../utils/vConsole';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFirstVisit: true,
            getTaxInvoice: false,
            profile: {

            }
        };
        this.handleCheckbox = this.handleCheckbox.bind(this)
        if (liffHelper.getProfile()) {
            liffHelper.getProfile()
                .then(profile => {
                    this.setState({ profile });
                }).then(() => {
                    this.props.register.setData("userId", this.state.profile.userId);
                }).then(() => {
                    const timestamp = Date.now().toString();
                    const orderId = this.state.profile.userId + timestamp;
                    this.props.register.setData("orderId", orderId);
                })
        } else {
            console.log("Please open in LINE")
        }

    }

    async handleCheckbox() {
        await this.setState(state => ({
            getTaxInvoice: !state.getTaxInvoice
        }));
        await this.props.register.setData('taxInvoice', this.state.getTaxInvoice);
        await this.props.register.setInvalid('taxInvoiceInvalid', !this.state.getTaxInvoice);
    }

    onTextChange = (key, value) => {
        const key2 = key + "Invalid"
        this.props.register.setData(key, value);
        if (!this.state.isFirstVisit) {
            this.props.register.setInvalid(key2, false);
        }
    }

    passValidate(value) {
        if (!value.firstnameInvalid && !value.lastnameInvalid && !value.emailInvalid && !value.telInvalid) {
            if (!value.taxInvoiceInvalid) {
                if (value.nameInTaxInvalid || value.typeInvlid ||
                    value.addressInvalid || value.type || value.subDistrictInvalid) {
                    return false
                }
                return true
            }
            return true
        }
        return false
    }

    validate = async (data) => {
        this.setState({
            isFirstVisit: false
        })
        await this.props.register.submit();
        console.log(data.tel)
        const { isInvalid } = this.props.register.toJS();
        console.log(isInvalid)
        if (!await this.passValidate(isInvalid)) {
            return Swal.fire({
                type: 'error',
                title: 'Order submission failed!',
                footer: 'Please check the form again',
                confirmButtonColor: 'rgb(54, 134, 201)',
            })
        }
        await this.alert(data)
        await liffHelper.closeWindow();
        return null
    }

    async feedback(data) {
        const { courseDetail } = this.props.register.toJS();
        const mesg = messageHelper.createTextMessage(`Reserved Successful :) 
        \n Quantity: ${this.props.register.data.qty}
        \n TotalPrice: ${this.props.register.data.totalPrice}`)
        const tempPic = "https://www.img.in.th/images/80b7d90d955cf68a7b9b4ac7acd7e4a2.jpg"
        console.log("data : ", data)
        console.log("courseDetail :", courseDetail)
        const payment = await messageHelper.createBubblePayment(data, tempPic, courseDetail)
        //const pic = messageHelper.createImageMessage(tempPic, tempPic);
        if (mesg) {
            liffHelper.sendMessages([mesg])
        }
        if (payment) {
            try {
                liffHelper.sendMessages([payment]);
            } catch (err) {
                console.log(err.message)
            }
        }
    }

    async alert(data) {
        let confirmDialogOptions = {
            title: `Confirmation`,
            html: `<div style="text-align:left;padding: 0 10px 0 10px">Do you want to confirm ?</div>`,
            type: "question",
            showCancelButton: true,
            confirmButtonColor: "rgb(54, 134, 201)",
            reverseButtons: true,
            cancelButtonColor: "rgb(180, 197, 64)",
            confirmButtonText: "ยืนยัน",
            cancelButtonText: "ยกเลิก",
            customClass: "font-size-200",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    let result = await this.props.register.rdyToPost(api.url);
                    console.log(result)
                    result === 200 && await Swal.fire({
                        type: 'success',
                        title: 'Your order has been done',
                        text: 'Thank you for your purchase',
                        confirmButtonColor: 'rgb(54, 134, 201)',
                        confirmButtonText: 'Done',
                    })
                    await this.feedback(data);
                    return result;
                } catch (error) {
                    Swal.showValidationError(`การบันทึกล้มเหลว ${error.message}`);
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        };
        return Swal(confirmDialogOptions);
    }

    render() {
        const { data } = this.props.register.toJS();
        const { courseDetail } = this.props.register.toJS();
        const { isInvalid } = this.props.register.toJS();
        console.log(courseDetail)
        return (
            <Form>
                <Nav />
                <Container>
                    <div className="p-3 my-2 rounded bg-docs-transparent-grid center">
                        <Toast className="greyColor1">
                            <ToastHeader>
                                Summary
                            </ToastHeader>
                            <ToastBody>
                                Date: <Moment format="DD">{courseDetail.dateStart}</Moment>
                                - <Moment format="DD MMM YYYY">{courseDetail.dateEnd}</Moment><br />
                                Time: {courseDetail.timeStart} - {courseDetail.timeEnd}<br />
                                Location: {courseDetail.place.replace(/(<([^>]+)>)/ig, "")}<br />
                            </ToastBody>
                            <hr className="my-2" />
                            <div className="price-summary2">
                                <h6>
                                    QTY: {data.qty} <br />
                                    Total: {data.totalPrice} ฿
                                </h6>
                            </div>
                        </Toast>
                        <div>
                            <Row form>
                                <Col md-sm={6}>
                                    <FormGroup>
                                        <Label for="text">Name</Label><Label for="text" className="require">*</Label>
                                        <Input type="text" name="firstname" id="Firstname"
                                            placeholder="Firstname" value={data.firstname || ''}
                                            onChange={(e) => this.onTextChange('firstname', e.target.value)}
                                            invalid={!this.state.isFirstVisit && isInvalid.firstnameInvalid} />
                                        <FormFeedback>Please enter name.</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col md-sm={6}>
                                    <FormGroup>
                                        <Label for="text">Lastname</Label><Label for="text" className="require">*</Label>
                                        <Input type="text" name="lastname" id="Lastname"
                                            placeholder="Lastname" value={data.lastname || ''}
                                            onChange={(e) => this.onTextChange('lastname', e.target.value)}
                                            invalid={!this.state.isFirstVisit && isInvalid.lastnameInvalid} />
                                        <FormFeedback>Please enter lastname.</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label><Label for="text" className="require">*</Label>
                                <Input type="email" name="email" id="exampleEmail"
                                    placeholder="email@example.com" value={data.email || ''}
                                    onChange={(e) => this.onTextChange('email', e.target.value)}
                                    invalid={!this.state.isFirstVisit && isInvalid.emailInvalid} />
                                <FormFeedback>Please enter a valid email address</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="text">Tel</Label><Label for="text" className="require">*</Label>
                                <Input type="number" name="tel" id="tel"
                                    placeholder="0812345678" value={data.tel || ''}
                                    onChange={(e) => this.onTextChange('tel', e.target.value)}
                                    invalid={!this.state.isFirstVisit && isInvalid.telInvalid} />
                                <FormFeedback>Phone number must be 10 digits</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Tax invoice" onClick={() => this.handleCheckbox()} />
                                {
                                    this.state.getTaxInvoice ?
                                        <div>
                                            <FormGroup style={{ margin: '8px' }}>
                                                <Label for="text">Type</Label><Label for="text" className="require">*</Label><br />
                                                <CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label="company" inline
                                                    value={'company' || ''} defaultChecked onChange={(e) => this.onTextChange('type', e.target.value)} />
                                                <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="personal" inline
                                                    value={'personal' || ''} onChange={(e) => this.onTextChange('type', e.target.value)} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="text" >
                                                    {data.type === 'company' ? "Name of company" : "Name of person"}
                                                </Label><Label for="text" className="require">*</Label>
                                                <Input type="text" name="nameInTax" id="nameInTax"
                                                    placeholder="Name" value={data.nameInTax || ''}
                                                    onChange={(e) => this.onTextChange('nameInTax', e.target.value)}
                                                    invalid={!this.state.isFirstVisit && isInvalid.nameInTaxInvalid} />
                                                <FormFeedback>Please input name</FormFeedback>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleAddress2">Address</Label><Label for="text" className="require">*</Label>
                                                <Input type="text" name="address2" id="exampleAddress2"
                                                    placeholder="Apartment, studio, or floor" value={data.address || ''}
                                                    onChange={(e) => this.onTextChange('address', e.target.value)}
                                                    invalid={!this.state.isFirstVisit && isInvalid.addressInvalid} />
                                                <FormFeedback>Address cannot be empty</FormFeedback>
                                            </FormGroup>
                                            <FormGroup>
                                                <AddressData />
                                            </FormGroup>
                                            <FormGroup>
                                                {(data.pcode === "") && <FormText>Please fill in all address form</FormText>}
                                            </FormGroup>
                                        </div> : null
                                }
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleText">More Detail</Label>
                                <Input type="textarea" name="text" id="exampleText" value={data.text || ''}
                                    onChange={(e) => this.onTextChange('text', e.target.value)} />
                            </FormGroup>
                            <Button className="float-right" style={{ color: 'white', background: '#3686C9', border: '#3686C9' }}
                                onClick={() => this.validate(data, isInvalid)}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </Container>
            </Form>
        )
    }
}
export default inject('register')(observer(Register));