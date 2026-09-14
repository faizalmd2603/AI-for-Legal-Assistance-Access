import { ActionObligation } from '../types';

/**
 * Exports action obligations as an iCalendar (.ics) format file
 */
export function generateICSContent(documentTitle: string, obligations: ActionObligation[]): string {
  const now = new Date();
  const formatICSDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  let ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ClarifyLex AI//Legal Action Pack//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH'
  ];

  obligations.forEach((item, index) => {
    const eventDate = new Date(now.getTime() + (index + 1) * 7 * 24 * 60 * 60 * 1000); // spread across upcoming weeks
    const endDate = new Date(eventDate.getTime() + 60 * 60 * 1000); // 1 hour event

    const uid = `clarifylex-${item.id || index}-${Date.now()}@clarifylex.ai`;
    const summary = `[ClarifyLex] ${item.title} (${item.section})`;
    const description = `${item.description}\\n\\nNotice Requirement: ${item.noticeDays ? item.noticeDays + ' days notice required.' : 'See contract terms.'}\\nPenalty Warning: ${item.penaltyWarning || 'None noted'}\\nDocument: ${documentTitle}`;

    ics.push(
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${formatICSDate(now)}`,
      `DTSTART:${formatICSDate(eventDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `SUMMARY:${summary.replace(/,/g, '\\,')}`,
      `DESCRIPTION:${description.replace(/,/g, '\\,')}`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder: Contract deadline upcoming',
      'END:VALARM',
      'END:VEVENT'
    );
  });

  ics.push('END:VCALENDAR');
  return ics.join('\r\n');
}

export function downloadICSFile(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename.endsWith('.ics') ? filename : `${filename}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
