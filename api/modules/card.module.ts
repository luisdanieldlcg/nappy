import { ICardDTO } from "../dtos/card.dto";
import { ApiModule } from "./module";

export class CardModule extends ApiModule {
  private static RESOURCE = "cards";

  protected getResource(): string {
    return CardModule.RESOURCE;
  }
  public async getAllByUser() {
    return this.get<ICardDTO[]>("/");
  }

  public async create(card: FormData) {
    return this.post<ICardDTO>({
      endpoint: "/",
      data: card,
    });
  }

  public async updateById(id: string, card: FormData) {
    return this.patch<ICardDTO>({
      endpoint: `/${id}`,
      data: card,
    });
  }

  public async getById(id: string) {
    return this.get<ICardDTO>(`/${id}`);
  }
}
