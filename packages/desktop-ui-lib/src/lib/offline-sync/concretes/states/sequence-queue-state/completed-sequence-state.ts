import { InProgressSequenceState } from '.';
import { QueueState } from '../../../interfaces/queue-state';
import { ISequence } from '../../sequence-queue';

export class CompletedSequenceState extends QueueState<ISequence> {
	public enqueue(data: ISequence): void {
		this.context.state = new InProgressSequenceState(this.context);
		this.context.queue.append(data);
	}
	public dequeue(): void {
		console.log('✅ - Completed');
	}
}
