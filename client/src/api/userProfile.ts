import { supabase } from "../supabase";

export const updateUserTheme = async (theme: string) => {
  try {
    // 현재 로그인한 유저 정보 가져오기
    const user = await supabase.auth.getUser();

    if (!user) {
      console.error("로그인된 사용자가 없습니다.");
      return;
    }

    // 유저 테마 업데이트
    const { error } = await supabase
      .from("UserProfile")
      .update({ theme }) // 테마 업데이트
      .eq("id", user.data.user?.id); // 현재 유저의 id로 필터링

    if (error) throw error;

    console.log("테마가 성공적으로 업데이트되었습니다!");
    return;
  } catch (error) {
    console.error("테마 업데이트 중 오류 발생:", error);
    return null;
  }
};

export const getUserTheme = async () => {
  try {
    // 현재 로그인한 유저 정보 가져오기
    const user = await supabase.auth.getUser();

    if (!user) {
      console.error("로그인된 사용자가 없습니다.");
      return null;
    }

    // 유저의 프로필을 가져오기
    const { data, error } = await supabase
      .from("UserProfile")
      .select("theme") // 'theme' 컬럼만 가져오기
      .eq("id", user.data.user?.id)
      .single(); // 한 건의 데이터만 가져오기

    if (error) {
      console.error("유저 테마 조회 중 오류 발생:", error);
    }
    // 유저 테마가 없으면 새로 생성
    if (!data) {
      const { data: newData, error: insertError } = await supabase
        .from("UserProfile")
        .insert([{ id: user.data.user?.id }]);

      if (insertError) {
        console.error("새로운 프로필 생성 중 오류 발생:", insertError);
        return null;
      }

      console.log("새로운 프로필이 생성되었습니다.", newData);
      return "light"; // 생성된 프로필 데이터 반환
    }

    // 테마가 존재하면 그 값을 반환
    console.log("현재 유저의 테마:", data.theme);
    return data.theme;
  } catch (error) {
    console.error("프로필 조회 중 오류 발생:", error);
    return null;
  }
};
