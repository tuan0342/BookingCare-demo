import React from "react";
import './ListItem.css';
import { Link } from "react-router-dom";

function ListItem(props) {
    // const title = "Phân biệt bệnh thần kinh và bệnh tâm thần để đi khám và điều trị ...";
    // const body = "Oct 30, 2016 ... Nhiều bệnh nhân gặp các triệu chứng, biểu hiện của bệnh Tâm thần nhưng lại chọn khám với bác sĩ chuyên khoa Thần kinh hoặc ngược lại.";
    // const link = "https://bookingcare.vn/cam-nang/phan-biet-benh-than-kinh-va-benh-tam-than-de-di-kham-va-dieu-tri-hieu-qua-p36.html";
    // const image = "https://cdn.bookingcare.vn/fr/w1200/2017/08/14/154102230620phan-biet-benh-than-kinh-va-tam-than.jpg";

    const {title, body, link, image} = props.data;

    return (
        <div className="container">
            <Link to={link} target="_blank" className="title" style={{color: '#1906A7'}}>{title}</Link>
            <div className="body">
                <img className='image' height={60} width={130} src={image} alt='BookingCare' />
                <div className="content" style={{color: '#393939'}}>{body}</div>
            </div>
        </div>
    )
}

export default ListItem;