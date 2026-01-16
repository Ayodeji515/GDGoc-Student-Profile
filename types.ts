
export interface SOTMData {
  organizationName: string;
  subTitle: string;
  fullName: string;
  profileImage: string | null;
  department: string;
  level: string;
  business: string;
  brandName: string;
  hobby: string;
  techStory: string;
  personality: string;
  motivationTitle: string;
  motivationText: string;
  signatureText: string;
  instagramHandle: string;
  tiktokHandle: string;
}

export const defaultData: SOTMData = {
  organizationName: '',
  subTitle: '',
  fullName: '',
  profileImage: null,
  department: '',
  level: '',
  business: '',
  brandName: '',
  hobby: '',
  techStory: '',
  personality: '',
  motivationTitle: 'WHAT MOTIVATES YOU TO LEARN MORE:',
  motivationText: '',
  signatureText: 'From The GDG FUOYE Team',
  instagramHandle: '',
  tiktokHandle: ''
};
