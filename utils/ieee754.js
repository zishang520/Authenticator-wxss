exports.read=function(t,o,a,r,h){var M,p,f=8*h-r-1,w=(1<<f)-1,e=w>>1,i=-7,n=a?h-1:0,s=a?-1:1,N=t[o+n];for(n+=s,M=N&(1<<-i)-1,N>>=-i,i+=f;i>0;M=256*M+t[o+n],n+=s,i-=8);for(p=M&(1<<-i)-1,M>>=-i,i+=r;i>0;p=256*p+t[o+n],n+=s,i-=8);if(0===M)M=1-e;else{if(M===w)return p?NaN:1/0*(N?-1:1);p+=Math.pow(2,r),M-=e}return(N?-1:1)*p*Math.pow(2,M-r)},exports.write=function(t,o,a,r,h,M){var p,f,w,e=8*M-h-1,i=(1<<e)-1,n=i>>1,s=23===h?Math.pow(2,-24)-Math.pow(2,-77):0,N=r?0:M-1,u=r?1:-1,c=o<0||0===o&&1/o<0?1:0;for(o=Math.abs(o),isNaN(o)||o===1/0?(f=isNaN(o)?1:0,p=i):(p=Math.floor(Math.log(o)/Math.LN2),o*(w=Math.pow(2,-p))<1&&(p--,w*=2),o+=p+n>=1?s/w:s*Math.pow(2,1-n),o*w>=2&&(p++,w/=2),p+n>=i?(f=0,p=i):p+n>=1?(f=(o*w-1)*Math.pow(2,h),p+=n):(f=o*Math.pow(2,n-1)*Math.pow(2,h),p=0));h>=8;t[a+N]=255&f,N+=u,f/=256,h-=8);for(p=p<<h|f,e+=h;e>0;t[a+N]=255&p,N+=u,p/=256,e-=8);t[a+N-u]|=128*c}