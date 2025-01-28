import React, { useEffect, useState } from 'react';
import { ScheduledPost } from './ScheduledPost';
import { useAuthStore } from '../../store/authStore';
import axios from 'axios';
import Cookies from 'js-cookie';


interface CalendarGridProps {
  currentDate: Date;
}

interface ScheduledPostData {
  _id: string;
  user_email: string;
  content: string;
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  platform: string;
  media: string[];
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate }) => {
  const { user } = useAuthStore();
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPostData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchScheduledPosts = async () => {
      if (!user?.email) return;

      try {

        const jwtToken = Cookies.get('jwt_token');
        if (!jwtToken) {
          throw new Error('No JWT token found');
        }
        const response = await axios.post('https://kimchi-new.yellowpond-c706b9da.westus2.azurecontainerapps.io/api/db/get_posts', {
          email: user.email,
        }, {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.data) {
          setScheduledPosts(response.data);
        }
      } catch (error) {
        console.error('Error fetching scheduled posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScheduledPosts();
  }, [user?.email]);

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

  const days = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - firstDayOfMonth + 1;
    return dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : null;
  });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getPostsForDay = (day: number) => {
    return scheduledPosts.filter(post => 
      post.year === currentDate.getFullYear() &&
      post.month === currentDate.getMonth() + 1 &&
      post.day === day
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

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
                <div className="space-y-2">
                  {getPostsForDay(day).map((post) => (
                    <ScheduledPost
                      key={post._id}
                      content={post.content}
                      platform={post.platform}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};