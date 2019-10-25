import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Media, Container, Toast, Row, Col } from 'reactstrap';
import Nav from '../pages/components/Nav'
import { MDBCarousel,MDBCarouselInner, MDBCarouselItem, MDBView, } from
    "mdbreact";

class Homepage extends Component {
    async componentWillMount() {
        //this.props.history.push('/profile?id=1')
        await this.props.courseListStore.initData();
        console.log(this.props.courseListStore.toJS())
    }
    handleClick(id) {
        this.props.history.push(`/profile2?id=${id}`);
        console.log('The link was clicked.');
    }

    render() {
        const { courseList } = this.props.courseListStore.toJS();
        return (
            <div>
                <Nav />
                <MDBCarousel
                    activeItem={1}
                    length={3}
                    showControls={true}
                    showIndicators={true}
                    className="z-depth-1"
                >
                    <MDBCarouselInner >
                        <MDBCarouselItem itemId="1">
                            <MDBView>
                                <img
                                    className="imgspace"
                                    src="https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg"
                                    alt="First slide"
                                />
                            </MDBView>
                        </MDBCarouselItem>
                        <MDBCarouselItem itemId="2">
                            <MDBView>
                                <img
                                    className="imgspace"
                                    src="https://mdbootstrap.com/img/Photos/Slides/img%20(129).jpg"
                                    alt="Second slide"
                                />
                            </MDBView>
                        </MDBCarouselItem>
                        <MDBCarouselItem itemId="3">
                            <MDBView>
                                <img
                                    className="imgspace"
                                    src="https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg"
                                    alt="Third slide"
                                />
                            </MDBView>
                        </MDBCarouselItem>
                    </MDBCarouselInner>
                </MDBCarousel>
                <Row style={{ backgroundColor: '#eeeeee' }}>
                    <Container style={{ backgroundColor: '#eeeeee' }}>
                        <Col sm="12" md={{ size: 8, offset: 2 }} >
                            <h3 className="txt" style={{ backgroundColor: '#eeeeee' }}>หลักสูตรทั้งหมด</h3>
                            {courseList.map(course => (
                                <Container style={{ backgroundColor: '#eeeeee' }}>
                                    <div className="rounded" style={{ padding: '8px' }} >
                                        <Toast style={{ maxWidth: '500px' }} href="http://localhost:3000/profile?id=1">

                                            <Media style={{ padding: '20px' }}>
                                                <Media left href="#">
                                                    <Media src={course.img} alt="Generic placeholder image" style={{ width: '100px', height: '100px', borderRadius: '10px' }} />
                                                </Media>
                                                <Media body>
                                                    <Media style={{ padding: '15px' }}>
                                                        <a onClick={() => this.handleClick(course.id)}>
                                                            {course.courseTitle}
                                                        </a>

                                                    </Media>

                                                </Media>
                                            </Media>
                                        </Toast>
                                    </div>
                                </Container>
                            ))}
                        </Col>
                        <Col xs="3"></Col>
                    </Container>
                </Row>
            </div>
        )
    }
}
export default inject('courseListStore')(observer(Homepage));