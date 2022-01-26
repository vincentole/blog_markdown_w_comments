import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

type FrontMatterType = {
    title: string;
    date: string;
    image: string;
    summary: string;
    isFeatured: boolean;
};

interface IGrayMatterFile extends matter.GrayMatterFile<string> {
    data: FrontMatterType;
}

const postsDirectory = path.join(process.cwd(), '_content', 'posts');

function getPostData(postIdentifier: string) {
    const postSlug = postIdentifier.replace(/\.md$/, '');
    const filePath = path.join(postsDirectory, `${postSlug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent) as IGrayMatterFile;

    const postData = {
        slug: postSlug,
        ...data,
        content,
    };

    return postData;
}

export function getPostsFiles() {
    return fs.readdirSync(postsDirectory);
}

function getAllPosts() {
    const postFiles = getPostsFiles();
    const allPosts = postFiles.map((postFile) => getPostData(postFile));
    const sortedPosts = allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));

    return sortedPosts;
}

function getFeaturedPosts() {
    const allPosts = getAllPosts();
    const featuredPosts = allPosts.filter((post) => post.isFeatured);

    return featuredPosts;
}

export { getFeaturedPosts, getAllPosts, getPostData };
