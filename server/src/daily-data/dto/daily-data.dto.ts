import { IsString, IsArray, IsObject, IsOptional } from 'class-validator';

export class TodoItem {
  id: number;
  text: string;
  isDone: boolean;
}

export class WeatherData {
  temp_min: number; // 최저 온도
  temp_max: number; // 최고 온도
  id: number; // 도시 ID
  name: string; // 도시 이름
}
//아직 안 쓸듯
// export class CreateDailyDataDto {
//   userId: string;
//   date: string;
//   todoData: TodoItem[];
//   memoData: string;
//   weatherData?: WeatherData;
// }

export class UpdateDailyDataDto {
  @IsOptional()
  @IsObject()
  weatherData?: WeatherData;
  @IsArray()
  todoData: TodoItem[];
  @IsString()
  memoData: string;
}

export class DailyDataResponseDto {
  id: string;
  userId: string;
  created_at: Date;
  date: string;
  todoData: TodoItem[];
  memoData: string;
  weatherData?: WeatherData;
}
