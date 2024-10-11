import { Form, Link } from "react-router-dom";

type WantMealOrDrinkProps = {
  option: "meal" | "drink" | null;
};

export const WantMealOrDrink = ({ option }: WantMealOrDrinkProps) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4 text-yellow-50">
      <Form>
        <label htmlFor="">
          I want <Link to={"/"}>{option}</Link>
        </label>
        <input
          type="text"
          className="outline-none bg-yellow-300 text-yellow-800"
        />
      </Form>
    </div>
  );
};
