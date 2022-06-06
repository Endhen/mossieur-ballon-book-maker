import React from 'react'
import { v4 as uuid } from 'uuid';

class PageNumber extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageNumber: props.PageNumber
        }
    }

    static getDerivedStateFromProps(PageNumber, state) {
        return PageNumber
    }

    render() {

        let pageNumber = this.state.pageNumber,
            color = '#529FAC'


        return <div class="page-number" width="50" height="50">
            <span>1</span>
            <svg key={ uuid() } width="50" height="50" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_414_967)">
                    <path
                        d="M11.109 14.1734C12.5322 15.9955 17.4313 14.3408 16.642 12.8306C15.3816 10.4192 11.8532 15.5995 9.83693 16.3545C7.82067 17.1096 5.04832 16.7737 6.81255 14.3409"
                        stroke={ color } strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path fillRule="evenodd" clipRule="evenodd"
                        d="M10.1312 12.2568C10.3478 11.9844 10.4443 11.6333 10.49 11.295C10.8039 8.97351 10.7114 6.05246 9.86501 4.05362C9.75013 3.77256 9.60913 3.49884 9.44154 3.23626C9.4049 3.17851 9.36738 3.12221 9.32891 3.06726L9.31975 3.05412C7.75467 0.81882 4.75715 0.331973 2.62192 1.96901C0.482459 3.60933 0.013795 6.76486 1.57601 9.01134C1.8425 9.39455 2.15101 9.72674 2.49028 10.0062C4.00147 11.3487 6.35166 12.2309 8.72349 12.6661C8.99952 12.7167 9.3723 12.7138 9.67379 12.5989C9.68024 12.6118 9.68765 12.6243 9.69608 12.6364C9.70826 12.654 9.72192 12.6697 9.73677 12.6835C9.65906 12.8137 9.60101 12.9756 9.57429 13.1554C9.50188 13.6429 9.68719 14.0786 9.9878 14.1278C10.1423 14.1531 10.2973 14.0715 10.4214 13.92C10.607 14.007 10.7919 14.01 10.9246 13.9082C11.0584 13.8056 11.1118 13.6176 11.088 13.4033C11.2722 13.3263 11.4005 13.193 11.4254 13.0257C11.4722 12.71 11.1334 12.3921 10.6691 12.316C10.4943 12.2874 10.3265 12.2971 10.1827 12.3372C10.1749 12.3193 10.1653 12.302 10.1538 12.2855C10.1468 12.2753 10.1392 12.2658 10.1312 12.2568V12.2568Z"
                        fill={ color } />
                </g>
                <defs>
                    <clipPath id="clip0_414_967">
                        <rect width="18" height="18" fill="white"
                            transform="matrix(-1 8.74228e-08 8.74228e-08 1 18 0)" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    }
}

export default PageNumber