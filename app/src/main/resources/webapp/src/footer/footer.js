import './footer.css';

function Footer() {
    return (
        <div className="footer">
            <div className="footer-main">
                <div>
                    <ul className="main-f">
                        <li className="f-f"><img src='img/logo.png' className='logo'></img><span>여긴 좋아</span></li>
                        <li className="f-s">Get the lates Updates</li>
                    </ul>
                </div>
                <div>
                    <ul className="main-s">
                        <li className="s-f">가나다라</li>
                        <li className="s-s">가나다</li>
                    </ul>
                </div>
                <div>
                    <ul className="main-t">
                        <li className="t-f">Support</li>
                        <li className="t-s">Help center</li>
                        <li className="t-t">Terms of service</li>
                    </ul>
                </div>
            </div>

            <div className="footer-tail">
                <div className="footer-tail-left">여긴 좋아,lnc.All Rights</div>
                <div className="footer-tail-right">
                    <img src='img/instagram.png' className='insta'></img>
                    <img src='img/twitter.png' className='twi'></img>
                    <img src='img/telegram.png' className='tele'></img>
                    <img src='img/Discord.png' className='disc'></img>
                </div>
                
            </div>
            

        </div>
    );
  }
  
  export default Footer;