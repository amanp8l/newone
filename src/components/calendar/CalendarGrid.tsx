import React from 'react';
import { ScheduledPost } from './ScheduledPost';

interface CalendarGridProps {
  currentDate: Date;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate }) => {
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  // Dummy scheduled posts data
  const scheduledPosts = {
    5: [
      {
        platform: 'instagram',
        time: '10:00 AM',
        content: 'Exciting new features coming to our platform! Stay tuned! 🚀 #Innovation',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&auto=format'
      }
    ],
    12: [
      {
        platform: 'twitter',
        time: '2:30 PM',
        content: 'Join us for a live Q&A session about the future of social media marketing! #SocialMedia'
      }
    ],
    15: [
      {
        platform: 'linkedin',
        time: '11:00 AM',
        content: "We're excited to announce our latest partnership with industry leaders!"
      }
    ],
    20: [
      {
        platform: 'facebook',
        time: '3:00 PM',
        content: 'Check out our new case study on successful social media strategies',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format'
      }
    ]
  };

  const days = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - firstDayOfMonth + 1;
    return dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : null;
  });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm p-6">
      <div className="grid grid-cols-7 gap-4 mb-4">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm font-medium text-indigo-600">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-4">
        {days.map((day, index) => (
          <div
            key={index}
            className={`min-h-[120px] rounded-lg p-2 ${
              day ? 'bg-gradient-to-br from-indigo-50/50 to-pink-50/50' : 'bg-transparent'
            }`}
          >
            {day && (
              <>
                <div className="text-sm font-medium text-indigo-900 mb-2">{day}</div>
                {scheduledPosts[day as keyof typeof scheduledPosts]?.map((post, postIndex) => (
                  <ScheduledPost
                    key={postIndex}
                    platform={post.platform}
                    time={post.time}
                    content={post.content}
                  />
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};