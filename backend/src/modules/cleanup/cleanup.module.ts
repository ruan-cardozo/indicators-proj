import { Module } from "@nestjs/common";
import { CleanupService } from "./cleanup.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "src/common/entities/project.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Project])],
    providers: [CleanupService],
    exports: [CleanupService]
})
export class CleanupModule { }