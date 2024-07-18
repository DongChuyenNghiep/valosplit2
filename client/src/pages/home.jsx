import React, { useEffect, useState } from 'react';
import Waiting from '../image/waiting.png';
import Raze from '../image/Raze.png';
import Wingman from '../image/wingman.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faDiscord, faInstagram } from '@fortawesome/free-brands-svg-icons';
import $ from 'jquery';
import 'animate.css';
import Video from '../image/Loong.mp4'

document.addEventListener('DOMContentLoaded', function() {
    document.body.style.overflow = 'auto'; // Re-enable scrolling
});

export default function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const scrollToTop = () => {
            document.documentElement.scrollTop = 0;
            setLoading(false);
        };
        document.title = "Trang chủ"
        // Delay to show loading indicator and scroll to top
        setTimeout(scrollToTop, 0); // Adjust delay as needed
    }, []);

    return (
        <>
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className='intro'>
                    <div className="welcome animate__animated animate__fadeIn">
                        <section className="text">
                            <p style={{fontSize:'40px',fontWeight:"900"}}>CHÀO MỪNG TỚI GIẢI <span style={{color:"orange"}}>VALORANT</span> THPT PHÚ NHUẬN</p>
                            <p>Mục đích tụi mình tạo ra giải này để giúp các bạn có thể giải trí sau giờ học căng thẳng. Các thông tin
                                trận đấu sẽ được cập nhật trên này và trên kênh <a href="https://discord.gg/QbtBzVDq3Z">Discord của
                                trường THPT Phú Nhuận</a>.</p>
                            <p>Cám ơn các bạn đã dành thời gian để tham gia giải. Hi vọng các bạn sẽ tận hưởng và ủng hộ giải đấu của
                                page nhé !!!</p>
                        </section>
                        <div className="image1"><img src={Waiting} alt="Waiting" /></div>
                    </div>
                    <div className='hightlight animate__animated animate__fadeInUp'>
                        <section className='text'>
                            <h2>Các hightlight trong giải đấu liệu có đăng lên không ?</h2>
                            <p>Hiện tại tụi mình chỉ có thể đăng <b style={{ color: '#f59e34' }}>Hightlight</b> khi các bạn gửi VOD cho mình. Tụi mình sẽ không đăng lên page trong giải lần này nhé (do chưa đến giai đoạn để đăng)</p>
                        </section>
                        <div className='image1'><video controls><source src={Video}/></video></div>
                    </div>
                    <div className='why tag'>
                        <section className='text'>
                            <h2>Giải đang trong giai đoạn thử nghiệm.</h2>
                            <p><b style={{ color: '#f59e34' }}>Đúng vậy</b>, vì chúng mình mới tổ chức các giải đấu game gần đây nên vẫn còn thiếu kinh nghiệm, đồng thời
                                thử nghiệm các thể thức thi đấu và thêm chức năng mới cho website.
                                Tụi mình sẽ tổ chức giải chính thức khi mọi thứ đã được hoàn thiện.</p>
                            <p>Ở giải đấu lần này, tụi mình sẽ thử nghiệm thể thức Swiss System,
                                hệ thống Pick'em Challenge, hiện thông số giải đấu và CÓ THỂ thêm phần Đăng kí/ Đăng nhập tài khoản.
                                Khung thời gian thi đấu cũng sẽ được chỉnh sửa lại để phù hợp với các đội. </p>
                        </section>
                        <div className='image1'><img src={Raze} alt="Raze" /></div>
                    </div>
                    <div className='prize-info tag'>
                        <section className='text' style={{ marginTop: '40px' }}>
                            <h2>Giải thưởng và Livestream</h2>
                            <p>Giải đấu lần này sẽ không có phần thưởng do đang trong quá trình thử nghiệm, thay vào đó
                            Top 3 team sẽ được đăng bài chúc mừng trên page <a href='https://www.facebook.com/dongchuyennghiep'> Dong Chuyen Nghiep </a> trên Facebook. Xin lỗi và mong các 
                            bạn có thể thông cảm cho sự bất tiện này.</p>
                            <p>Về vấn đề Livestream giải đấu thì ngoài việc page chưa lên kế hoạch, chúng mình cũng đang thiếu nhân lực, thiết bị lẫn thời gian để chuẩn bị, nên nếu bạn muốn đóng góp hoặc 
                                tham gia vào danh mục này trong thời gian tới thì có thể liên hệ với chúng mình trên <a href='https://discord.gg/wkBH9DqJdT'> Discord</a>.
                            </p>
                        </section>
                        <div className='image1'><img src={Wingman} alt="Wingman" /></div>
                    </div>
                    <div className='social-media tag'>
                        <h2>Follow mạng xã hội của tụi mình để cập nhật tin tức giải đấu và thông tin về trường THPT Phú Nhuận</h2>
                        <div className='social-link tag'>
                            <div className='facebook'>
                                <a href='https://www.facebook.com/dongchuyennghiep' className='linkfb'>
                                    <div className='pa'>
                                        <FontAwesomeIcon icon={faFacebook} className='facebook' />
                                        <p style={{ fontStyle: 'italic', fontWeight: '900', marginTop: '20px' }}>DONG CHUYEN NGHIEP</p>
                                    </div>
                                </a>
                            </div>
                            <div className='instagram'>
                                <a href='https://www.instagram.com/dongchuyennghieppn/' className='linkinsta'>
                                    <div className='pa'>
                                        <FontAwesomeIcon icon={faInstagram} className='instagram' />
                                        <p style={{ fontWeight: '900', marginTop: '20px' }}>dongchuyennghiep</p>
                                    </div>
                                </a>
                            </div>
                            <div className='discord'>
                                <a href='https://discord.gg/wkBH9DqJdT' className='linkdis'>
                                    <div className='pa'>
                                        <FontAwesomeIcon icon={faDiscord} className='discord' />
                                        <p style={{ fontWeight: '900', marginTop: '20px' }}>THPT Phú Nhuận</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

$(document).on("scroll", function () {
    // Get the current scroll position of the page.
    var pageTop = $(document).scrollTop();

    // Calculate the bottom of the visible part of the page.
    var pageBottom = pageTop + $(window).height();

    // Select all elements with class "tag".
    var tags = $(".tag");

    // Loop through each tag and check if it's visible on the screen.
    for (var i = 0; i < tags.length; i++) {
        var tag = tags[i];

        // If the tag is visible, add class "visible" to it.
        if ($(tag).position().top < pageBottom) {
            $(tag).addClass("visible");
        }
        // If the tag is not visible, remove class "visible" from it.
        else {
            $(tag).removeClass("visible");
        }
    }
});
