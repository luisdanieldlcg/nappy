import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { switchMap } from 'rxjs';
import { CardImagesInterceptor } from '../../../common/interceptors/card-img-upload.interceptor';
import { ParseObjectIdPipe } from '../../../common/pipe/parse-object-id.pipe';
import { CardImages, UploadedCardImages } from '../../../common/types';
import { GetUserPrincipal } from '../../auth/decorators/user-principal.decorator';
import { AccessGuard } from '../../auth/guards';
import { UserPrincipal } from '../../auth/interface/user-principal.interface';
import { CreateCardDTO, UpdateCardDTO } from '../dto/card.dto';
import { CardService } from '../service/card.service';
import { ParseCardImagesPipe } from '../../../common/pipe/parse-card-images.pipe';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @UseGuards(AccessGuard)
  @UseInterceptors(CardImagesInterceptor)
  public create(
    @Body() dto: CreateCardDTO,
    @GetUserPrincipal() user: UserPrincipal,
    @UploadedFiles(new ParseCardImagesPipe()) images: CardImages,
  ) {
    // create the union of the dto and the images
    const newDto: CreateCardDTO = { ...dto, ...images };
    return this.cardService.create(newDto, user);
  }

  // Public route
  @Get(':id')
  public getCardById(@Param('id', ParseObjectIdPipe) id: string) {
    return this.cardService.getCardById(id);
  }

  @Get()
  @UseGuards(AccessGuard)
  public getCardsByUser(@GetUserPrincipal() user: UserPrincipal) {
    return this.cardService.getCardsByUser(user.id);
  }

  @Put(':id')
  @UseGuards(AccessGuard)
  @UseInterceptors(CardImagesInterceptor)
  public update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateCardDTO,
    @GetUserPrincipal() user: UserPrincipal,
    @UploadedFiles(new ParseCardImagesPipe()) images: CardImages,
  ) {
    // return this.cardService
    //   .assertCardBelongsTo(id, user)
    //   .pipe(
    //     switchMap((newDto) => this.cardService.updateCard(id, newDto, user)),
    //   );

    // create the union of the dto and the images
    const newDto = { ...dto };

    // If the images are all null, then we don't want to update the images
    if (images.coverImage) {
      newDto.coverImage = images.coverImage;
    }
    if (images.avatarImage) {
      newDto.avatarImage = images.avatarImage;
    }
    return this.cardService.updateCard(id, newDto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AccessGuard)
  public delete(@Param('id', ParseObjectIdPipe) id: string) {
    return this.cardService.delete(id);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AccessGuard)
  public deleteAll(@GetUserPrincipal() user: UserPrincipal) {
    return this.cardService.deleteAll(user);
  }
}
