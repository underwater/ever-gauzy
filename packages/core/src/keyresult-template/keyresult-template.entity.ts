import { Column, ManyToOne, RelationId, JoinColumn, Index } from 'typeorm';
import {
	IKeyResultTemplate,
	KeyResultTypeEnum,
	KeyResultDeadlineEnum,
	IGoalTemplate,
	IGoalKPITemplate
} from '@gauzy/contracts';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsString } from 'class-validator';
import {
	GoalKPITemplate,
	GoalTemplate,
	TenantOrganizationBaseEntity
} from '../core/entities/internal';
import { MultiORMEntity } from './../core/decorators/entity';
import { MikroOrmKeyresultTemplateRepository } from './repository/mikro-orm-keyresult-template.repository';

@MultiORMEntity('key_result_template', { mikroOrmRepository: () => MikroOrmKeyresultTemplateRepository })
export class KeyResultTemplate extends TenantOrganizationBaseEntity implements IKeyResultTemplate {

	@ApiProperty({ type: () => String })
	@Column()
	name: string;

	@ApiProperty({ type: () => String, enum: KeyResultTypeEnum })
	@IsEnum(KeyResultTypeEnum)
	@Column()
	type: string;

	@ApiProperty({ type: () => String })
	@Column({ nullable: true })
	@IsOptional()
	unit?: string;

	@ApiProperty({ type: () => Number })
	@Column({ nullable: true })
	@IsOptional()
	targetValue?: number;

	@ApiProperty({ type: () => Number })
	@Column({ nullable: true })
	@IsOptional()
	initialValue: number;

	@ApiProperty({ type: () => String, enum: KeyResultDeadlineEnum })
	@IsEnum(KeyResultDeadlineEnum)
	@Column()
	deadline: string;

	/*
	|--------------------------------------------------------------------------
	| @ManyToOne
	|--------------------------------------------------------------------------
	*/
	@ApiProperty({ type: () => GoalKPITemplate })
	@ManyToOne(() => GoalKPITemplate, { nullable: true })
	@JoinColumn({ name: 'kpiId' })
	@IsOptional()
	kpi?: IGoalKPITemplate;

	@ApiProperty({ type: () => String, readOnly: true })
	@RelationId((it: KeyResultTemplate) => it.kpi)
	@IsString()
	@IsOptional()
	@Column({ nullable: true })
	kpiId?: string;


	@ApiProperty({ type: () => GoalTemplate })
	@ManyToOne(() => GoalTemplate, (goalTemplate) => goalTemplate.keyResults, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'goalId' })
	goal: IGoalTemplate;

	@ApiProperty({ type: () => String, readOnly: true })
	@RelationId((it: KeyResultTemplate) => it.goal)
	@IsString()
	@IsOptional()
	@Index()
	@Column({ nullable: true })
	readonly goalId?: string;
}
