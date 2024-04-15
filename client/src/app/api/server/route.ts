// get todo
export async function GET(request: Request) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/1`, {
        headers: {
            "Content-Type": "application/json",
        },
        cache: "force-cache",
    });
    const todo = await res.json();

    return Response.json({ todo });
}
