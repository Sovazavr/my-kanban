import React, { useCallback, useEffect, useState } from 'react'
import { BoardMobile } from './BoardMobile/BoardMobile'
import { GlobalSVGSelector } from '../svgSelector/GlobalSVGSelector'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper";

export const BoardsComponentMobile = ({ boards, setBoards, setSelectedItem, deleteElement, popupActive, setPopupActive }) => {












    return (

        <>
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                navigation={true} modules={[Navigation, Pagination]}
                className='mySwiper'
            >
                <div className='boards__wrapper'>

                    {boards.map(board =>
                        <SwiperSlide>
                            <BoardMobile

                                board={board}
                                setSelectedItem={setSelectedItem}
                                deleteElement={deleteElement}
                                popupActive={popupActive}
                                setPopupActive={setPopupActive} />
                        </SwiperSlide>
                    )}
                </div>
            </Swiper>
        </>

    )
}
