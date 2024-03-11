import { EventType, GetEventsResponse, GetRawEventsParameters } from './GDSCDataService.type';
import { kkFetch } from '../../common/utils/kkFetch';

const DEFAULT_PARAMETERS: GetRawEventsParameters = [
  'title',
  'start_date',
  'event_type_title',
  'cropped_picture_url',
  'description',
  'description_short',
  'url',
];

const DEFAULT_EVENTS_PER_PAGE = 6;

export async function getRawEvents(
  clubId: string,
  eventType: EventType,
  pageNumber: number,
  pageSize = DEFAULT_EVENTS_PER_PAGE,
  parameters = DEFAULT_PARAMETERS
): Promise<GetEventsResponse> {
  const requestURL = `https://gdsc.community.dev/api/event_slim/?chapter=${clubId}&page_size=${pageSize}&status=${eventType}&include_cohosted_events=true&visible_on_parent_chapter_only=true&order=-start_date&fields=${parameters.join(
    ','
  )}&page=${pageNumber}`;
  const response = await kkFetch<GetEventsResponse>(requestURL);
  return await response.json();
}
