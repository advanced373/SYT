export interface Thought
{
    body: string,
    author: Author,
    postedAt: string
}
interface Author{
    name: string,
    image: string
}