import React, { useState } from 'react'
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import deleteicon from '../../images/delete.png'
import DeleteAddressHook from './../../hook/user/delete-address-hook';

const UserAddressCard = ({ item }) => {
    const [show, handleClose, handleShow, handelDelete] = DeleteAddressHook(item._id)

    return (
        <div className="user-address-card my-3 px-2">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title> <div className='font'>Confirm Deletion</div></Modal.Title>
                </Modal.Header>
                <Modal.Body><div className='font'>Are you sure you want to delete this address?</div></Modal.Body>
                <Modal.Footer>
                    <Button className='font' variant="success" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className='font' variant="dark" onClick={handelDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row className="d-flex justify-content-between  ">
                <Col xs="6">
                    <div className="p-2">{item.alias}</div>
                </Col>
                <Col xs="6" className="d-flex justify-content-end">
                    <div className="d-flex p-2">
                        <Link to={`/user/edit-address/${item._id}`} style={{ textDecoration: 'none' }}>
                            <div className="d-flex mx-2">
                                <img
                                    alt=""
                                    className="ms-1 mt-2"
                                    src={deleteicon}
                                    height="17px"
                                    width="15px"
                                />
                                <p className="item-delete-edit"> Edit</p>
                            </div>
                        </Link>
                        <div onClick={handleShow} className="d-flex ">
                            <img
                                alt=""
                                className="ms-1 mt-2"
                                src={deleteicon}
                                height="17px"
                                width="15px"
                            />
                            <p className="item-delete-edit"> Delete</p>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col xs="12">
                    <div
                        style={{
                            color: "#555550",
                            fontFamily: "Almarai",
                            fontSize: "14px",
                        }}>
                        {item.details}
                    </div>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col xs="12" className="d-flex">
                    <div
                        style={{
                            color: "#555550",
                            fontFamily: "Almarai",
                            fontSize: "16px",
                        }}>
                        Phone Number:
                    </div>

                    <div
                        style={{
                            color: "#979797",
                            fontFamily: "Almarai",
                            fontSize: "16px",
                        }}
                        className="mx-2">
                        {item.phone}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default UserAddressCard
