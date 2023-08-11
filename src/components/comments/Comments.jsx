import React from 'react'
import './comments.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBed,
    faCalendar
} from "@fortawesome/free-solid-svg-icons";
export default function Comments({ comments }) {
    return (
        <div className='comments-container'>
            {comments?.map((comment) => (
                <div className='comment'>
                    <div className='comment-left'>
                        <div className='comment-leftHeader'>
                            <div className='comment-leftScore'>
                                {comment.score}
                            </div>
                            <div className='comment-leftScoreText'>
                                {comment.scoreText}
                            </div>
                        </div>
                        <div className='comment-detail'>
                            <div className='comment-user'>
                                <strong>{comment.reviewer_name}</strong>
                                <span>từ</span>
                                <span>{comment.reviewer_country}</span>
                            </div>
                            <div className='comment-detail item'>
                                <FontAwesomeIcon icon={faBed} className='comment-detail item icon' />
                                <span>{comment.room_type}</span>
                            </div>
                            <div className='comment-detail item'>
                                <FontAwesomeIcon icon={faCalendar} className='comment-detail item icon' />
                                <span>{comment.stay_detail}</span>
                            </div>
                        </div>
                    </div>
                    <div className='comment-right'>
                        <div className='comment-bubble'>
                            <div className='comment-body'>
                                <div className='comment-body title'>
                                    "{comment.comment_title}"
                                </div>
                                <div className='comment-body text'>
                                    {comment.comment_text}
                                </div>
                                <div className='comment-review-date'>
                                    {comment.review_date}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
