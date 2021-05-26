/*
 * @Author: Xiong ZhiCheng 
 * @Date: 2021-05-21 14:46:56 
 * @Description: 
 */
export class PetManager {

    // "兔", "鹿", "牛", "驼", "蜃", "虎", "鹰", "鱼", "蛇"
    private nameList: string[] = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪", "鱼", "鹰", "蜃", "驼", "鹿"];

    public getMixturePets(name: string): string[] {
        switch (name) {
            case "龙":
                return ["兔", "鹿", "牛", "驼", "蜃", "虎", "鹰", "鱼", "蛇"];
        }
    }
}