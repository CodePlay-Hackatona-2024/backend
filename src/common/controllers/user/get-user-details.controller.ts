import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GetUserDetailsService } from 'src/common/providers/services/user/get-user-details.service';
import { API_TAGS_CONTROLLER } from 'src/common/utils/enums/api-tags';

@Controller(API_TAGS_CONTROLLER.USER.route)
@ApiTags(API_TAGS_CONTROLLER.USER.name)
export class GetUserDetailsController {
  constructor(private readonly service: GetUserDetailsService) {}

    @Get("/details/:id")
    @ApiOperation({ summary: 'Get user details' })
    @ApiResponse({ status: 200, description: 'User details' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async get_user_details(
        @Res() res: Response,
        @Param('id') id: string,
    ) {
        const result = await this.service.get_user_details(id);

        if (result.isErr()) {
            return res.status(404).json({ message: result.unwrapErr() });
        }

        return res.status(200).json(result.unwrap());
    }
}
