import TextInputPost from "./TextInputPost";
import useToken from "./Token";

export default function Home({passProfilePicture, passPosts}) {
    return (<div class="container6"><div class="post2"><TextInputPost username={useToken().token} posts={passPosts} profilePicture={passProfilePicture}/></div></div>);
}
