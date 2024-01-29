import {
	Index,
	Column,
	JoinColumn,
	RelationId,
	ManyToOne
} from 'typeorm';
import { IUser, IUserOrganization } from '@gauzy/contracts';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { TenantOrganizationBaseEntity, User } from '../core/entities/internal';
import { MultiORMEntity } from './../core/decorators/entity';
import { MikroOrmUserOrganizationRepository } from './repository/mikro-orm-user-organization.repository';

@MultiORMEntity('user_organization', { mikroOrmRepository: () => MikroOrmUserOrganizationRepository })
export class UserOrganization extends TenantOrganizationBaseEntity implements IUserOrganization {

	@ApiProperty({ type: () => Boolean, default: true })
	@Index()
	@Column({ default: true })
	isDefault: boolean;


	/*
	|--------------------------------------------------------------------------
	| @ManyToOne
	|--------------------------------------------------------------------------
	*/

	/**
	 * User
	 */
	@ApiProperty({ type: () => User })
	@ManyToOne(() => User, (user) => user.organizations, {
		onDelete: 'CASCADE'
	})
	@JoinColumn()
	user?: IUser;

	@ApiProperty({ type: () => String })
	@RelationId((it: UserOrganization) => it.user)
	@IsUUID()
	@Index()
	@Column()
	userId: IUser['id'];
}
