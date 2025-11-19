interface IHello {
  name?: string;
}

const HelloComponent = (hello: IHello) => <div>Hello, World!{hello.name}</div>;

export default HelloComponent;
