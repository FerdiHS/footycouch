import TextInputPost from "./TextInputPost";
import useToken from "./Token";

export default function Home({login, nowPage, handlenowPage}) {

    return (<div class="container6"><div class="post2"><TextInputPost username={useToken().token} posts={[]} /></div></div>);
}
