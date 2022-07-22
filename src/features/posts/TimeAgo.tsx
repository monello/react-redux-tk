import { parseISO, formatDistanceToNow } from "date-fns";

interface ITimeAgo {
    timestamp: string;
}

const TimeAgo = ({ timestamp }: ITimeAgo) => {
    let timeAgo = "";
    if (timestamp) {
        const date = parseISO(timestamp);
        const timePeriod = formatDistanceToNow(date);
        timeAgo = `${timePeriod} ago`;
    }
    return (
        <span title={timestamp}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    );
};

export default TimeAgo;
