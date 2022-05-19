import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { BookCategoryDto } from 'src/dto/bookCategory.dto';

import { bookcatogery } from 'src/models/bookCategory.entity';
import { Observable } from 'rxjs';


@Injectable()
export class BookcategoryService {
    constructor(
        @InjectRepository(bookcatogery)
        private readonly bookCategoryRepository: Repository<bookcatogery>,
    ) { }
    private bookcategory: bookcatogery[] = [];

    async addBookCategory(dto: BookCategoryDto): Promise<bookcatogery> {


        try {
            const bookCategory = this.bookCategoryRepository.create()
            bookCategory.Book_Category_Name = dto.Book_Category_Name
            bookCategory.Book_Description = dto.Book_Description;
            await this.bookCategoryRepository.save(bookCategory);
            return bookCategory;

        } catch (error) {
            throw new ForbiddenException("Credential taken")
        }

    }

    async updatecategory(Book_Category_Id: number, dto: BookCategoryDto): Promise<bookcatogery> {
        const categoryData = await this.bookCategoryRepository.findOne({ where: { Book_Category_Id: Book_Category_Id } })

        categoryData.Book_Category_Name = dto.Book_Category_Name;
        categoryData.Book_Description = dto.Book_Description;

        await this.bookCategoryRepository.save(categoryData)

        return categoryData
    }

    getcategory(): Promise<bookcatogery[]> {
        return this.bookCategoryRepository.find()
    }

    deletecategory(Book_Category_Id: number): Promise<DeleteResult> {
        return this.bookCategoryRepository.delete({ Book_Category_Id })
    }
}