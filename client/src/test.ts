declare const WithError: <T, E>(
    p: Promise<T>
) => Promise<[error: undefined, value: T] | [error: E, value: undefined]>;
declare const doSomething: () => Promise<string>;

interface Foo {
    bar: string;
}

const withError: typeof WithError = p => {
    return p;
};

const main = async () => {
    let [error, value] = await withError<string, Foo>(doSomething());
    console.log("🚀 ~ main ~ error, value:", error, value);
};
main();
