import {
	EntitySubscriberInterface,
	EventSubscriber,
	InsertEvent,
	LoadEvent,
} from 'typeorm';
import { faker } from '@faker-js/faker';
import { sluggable } from '@gauzy/common';
import { FileStorageProviderEnum } from '@gauzy/contracts';
import { FileStorage } from '../../core/file-storage';
import { TaskRelatedIssueType } from './related-issue-type.entity';

@EventSubscriber()
export class TaskRelatedIssueTypeSubscriber implements EntitySubscriberInterface<TaskRelatedIssueType> {
	/**
	 * Indicates that this subscriber only listen to TaskRelatedIssueType events.
	 */
	listenTo() {
		return TaskRelatedIssueType;
	}

	/**
	 * Called after entity is loaded from the database.
	 *
	 * @param entity
	 * @param event
	 */
	async afterLoad(
		entity: TaskRelatedIssueType | Partial<TaskRelatedIssueType>,
		event?: LoadEvent<TaskRelatedIssueType>
	): Promise<any | void> {
		try {
			if (entity.icon) {
				const store = new FileStorage().setProvider(FileStorageProviderEnum.LOCAL);
				entity.fullIconUrl = await store.getProviderInstance().url(entity.icon);
			}
		} catch (error) {
			console.error('Error in afterLoad:', error);
		}
	}

	/**
	 * Called before entity is inserted to the database.
	 *
	 * @param event
	 */
	beforeInsert(event: InsertEvent<TaskRelatedIssueType>) {
		try {
			if (event) {
				const { entity } = event;
				if (!entity.color) {
					entity.color = faker.internet.color();
				}
				if ('name' in entity) {
					entity.value = sluggable(entity.name);
				}
			}
		} catch (error) {
			console.log(error);
		}
	}
}
