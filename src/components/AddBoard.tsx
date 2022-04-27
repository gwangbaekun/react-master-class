import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { toDoState } from "../state";

interface IBoard {
  toDoBoard: string;
}

function AddBoard() {
  const { register, setValue, handleSubmit } = useForm<IBoard>();
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onValid = ({ toDoBoard }: IBoard) => {
    setToDos((prev) => {
      return {
        ...prev,
        [toDoBoard]: [],
      };
    });
    setValue("toDoBoard", "");
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("toDoBoard", { required: true })}
        type="text"
        placeholder="add Board"
      />
    </form>
  );
}

export default AddBoard;
