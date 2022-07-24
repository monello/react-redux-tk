import { useAppSelector } from "../../app/hooks";
import { selectAllUsers } from "../users/usersSlice";

interface IPostAuthor {
    userId?: string;
}

const PostAuthor = ({ userId }: IPostAuthor) => {
    const users = useAppSelector(selectAllUsers);
    const author = users.find((user) => user.id === userId);
    return <span>by {author ? author.name : "Unknow author"}</span>;
};

export default PostAuthor;
