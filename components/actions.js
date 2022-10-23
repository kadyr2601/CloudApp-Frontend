import {AiOutlineClockCircle} from "react-icons/ai";
import {BsCalendarDate} from "react-icons/bs";


const Actions = ({actionList}) => {

    return (
        <div className={'action-cont'}>
            <span className={'title'}>Last Actions</span>

            <div className={'action-list'}>
                {
                    actionList && actionList?.map((item, index) => (
                            <div className={'action'} key={index}>
                                <div className={'up'}>
                                    <div className={'block'}>
                                        <BsCalendarDate className={'icon'}/>
                                        {item?.date}
                                    </div>
                                    <div className={'block'}>
                                        <AiOutlineClockCircle className={'icon'}/>
                                        {item?.time}
                                    </div>
                                </div>
                                {
                                    item.action === 'authenticate' ?
                                        <div className={'down'}>
                                            {item.user} authenticated successfully
                                        </div> :
                                    item.action === 'looked' ?
                                        <div className={'down'}>
                                            {item.user} opened {item.name}
                                        </div> :
                                    item.action === 'deleted' ?
                                        <div className={'down'}>
                                            {item.user} removed {item.name}
                                        </div> :
                                    item.action === 'downloaded' ?
                                        <div className={'down'}>
                                            {item.user} download  {item.name}
                                        </div> :
                                    item.action === 'uploaded' ?
                                        <div className={'down'}>
                                            {item.user} uploaded {item.name}
                                        </div> : null
                                }
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
};

export default Actions;