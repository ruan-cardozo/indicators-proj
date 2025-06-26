import { Module } from "@nestjs/common";
import { DeduplicationService } from "./deduplication.service";
import { Type } from "class-transformer";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MetricHash } from "src/common/entities/metric-hash.entity";
import { DeduplicationInterceptor } from "./deduplication.interceptor";

@Module({
    imports: [TypeOrmModule.forFeature([MetricHash])],
    controllers: [],
    providers: [DeduplicationService, DeduplicationInterceptor],
    exports: [DeduplicationService, DeduplicationInterceptor]
})
export class DeduplicationModule { }