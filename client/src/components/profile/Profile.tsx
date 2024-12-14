import { useForm } from "react-hook-form";
import styled from "styled-components";

const ProfileBoard = styled.div`
  border-radius: 56px;
  width: 92%;
  height: 35%;
  background-color: ${(props) => props.theme.boardColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InputId = styled.input`
    width: 50%;
    height: 50px;
    margin-bottom: 30px;
    &:focus{
        outline: none;
    }
    border-radius: 20px;
    border: none;
    text-align: center;
`;

const InputPw = styled.input`
    width: 50%;
    height: 50px;
    margin-bottom: 30px;
    &:focus{
        outline: none;
    }
    border-radius: 20px;
    border: none;
    text-align: center;
`;

const WrapperBTN = styled.div`
    display: flex;
    justify-content: space-around;
    width: 50%;
`;

const LogInBTN = styled.button`
    cursor: pointer;
    border-radius: 20px;
    border: none;
    padding: 7px 30px;
    background-color: white;
    &:hover{
        background-color: #a091f2;
        transition: background-color 0.5s ease-in-out;
    }
`;

const SignBTN = styled.button`
    cursor: pointer;
    border-radius: 20px;
    border: none;
    padding: 7px 30px;
    background-color: white;
    &:hover{
        background-color: #a091f2;
        transition: background-color 0.5s ease-in-out;
    }
`;

interface LogInForm {
    id: string;
    pw: string;
}

function Profile() {
    const { register, setValue, handleSubmit } = useForm<LogInForm>();
    const onsubmit = (data: LogInForm) => {
        console.log(data)
        setValue("id", "");
        setValue("pw", "");
    }
    return (
        <ProfileBoard>
            <Form onSubmit={handleSubmit(onsubmit)}>
                <InputId
                    {...register("id", { required: true })}
                    placeholder="ID"
                ></InputId>
                <InputPw
                    {...register("pw", { required: true })}
                    placeholder="PassWord"
                ></InputPw>
                <WrapperBTN>
                    <LogInBTN type="submit">Log In</LogInBTN>
                    <SignBTN>Sing Up</SignBTN>
                </WrapperBTN>
            </Form>
        </ProfileBoard >
    )
}

export default Profile;