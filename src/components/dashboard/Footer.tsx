 import Images from '../../assets/img'
 export default function Footer(){
    return(
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-3">
                        <p>Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000</p>
                        <p>binarcarrental@gmail.com</p>
                        <p>081-233-334-808</p>
                    </div>
                    <div className="col-12 col-md-3">
                        <ul className="links">
                            <li><a href="#">Our services</a></li>
                            <li><a href="">Why Us</a></li>
                            <li><a href="">Testimonial</a></li>
                            <li><a href="">FAQ</a></li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-3">
                        <h6>Connect with us</h6>
                        <ul className="social">
                            <li><a href=""><img src={Images.facebook} alt=""/></a></li>
                            <li><a href=""><img src={Images.insta} alt=""/></a></li>
                            <li><a href=""><img src={Images.twitter} alt=""/></a></li>
                            <li><a href=""><img src={Images.mail} alt=""/></a></li>
                            <li><a href=""><img src={Images.twitch} alt=""/></a></li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-3">
                        <h6>Copyright Binar 2022</h6>
                    </div>
                </div>
            </div>
        </footer>
    )
}